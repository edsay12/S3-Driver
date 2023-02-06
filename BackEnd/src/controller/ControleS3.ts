import { Request, Response } from "express";
import aws, { S3 } from "aws-sdk";
import mime from "mime";
import upload from "../middleware/upload";
import path from "path";
import FileSystem from "fs";
import crypto from "crypto";

class ControlerS3 {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: "us-east-1", // Lembrar de sempre mudar a região
    });
  }

  createBucket(req: Request, res: Response) {
    const { bucketName } = req.params;
    const bucket = `${bucketName}-${crypto.randomBytes(10).toString("hex")}`;
    this.client.createBucket(
      {
        Bucket: bucket,
      },
      function (err, data) {
        if (err) {
          return res.status(400).json({ type: "Error", message: err });
        } else {
          return res.status(200).json({
            type: "success",
            message: "item deletado com sucesso",
            bucketName: data.Location,
          });
        }
      }
    );
  }

  async saveFile(req: Request, res: Response): Promise<void> {
    const { bucketName } = req.params;
    const filename = req.file?.filename ? req.file?.filename : "";
    const originalPath = path.resolve(
      __dirname,
      "../../public/upload",
      filename
    );

    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      //console.log("Arquivo não encontrado")
      throw new Error("file not found");
    }

    const fileContent = await FileSystem.promises.readFile(originalPath);
    this.client.upload(
      {
        Bucket: bucketName,
        Key: filename,
        ACL: "public-read",
        Body: fileContent,
        ContentType,
      },
      function (err, data) {
        if (err) {
          return res.status(400).json({ type: "Error", message: err });
        } else {
          return res.status(200).json({
            type: "success",
            message: "item adicionado com sucesso",
            item: data,
          });
        }
      }
    );
    await FileSystem.promises.unlink(originalPath);
  }

  async deleteFile(req: Request, res: Response) {
    const { bucketName, fileName } = req.params;

    if (!bucketName) {
      return res.status(400).json({
        type: "Error",
        message: "nome do bucker incorreto ou inexistente",
      });
    }
    if (!fileName) {
      return res.status(400).json({
        type: "Error",
        message: "nome do arquivo errado ou inexistente",
      });
    }

    await this.client.deleteObject(
      {
        Bucket: bucketName,
        Key: fileName,
      },
      function (err, data) {
        if (err) {
          return res.status(400).json({ type: "Error", message: err });
        } else {
          return res
            .status(202)
            .json({ type: "success", message: "item deletado com sucesso" });
        }
      }
    );
  }
  async getBucketItens(req: Request, res: Response) {
    const { bucketName } = req.params;
    this.client.listObjects(
      {
        Bucket: bucketName,
      },
      function (err, data) {
        if (err) {
          res.send({ type: "Error", message: err });
        } else {
          res.send({ type: "success", itens: data });
        }
      }
    );
  }

  async getBucketItem(req: Request, res: Response) {
    const { fileName, bucketName } = req.params;
    this.client.getObject(
      {
        Bucket: bucketName,
        Key: fileName,
      },
      function (err, data) {
        if (err) {
          res.send({ type: "Error", message: err });
        } else {
          res.send({ type: "success", iten: data });
        }
      }
    );
  }

  async getItemUrl(req: Request, res: Response) {
    const { fileName, bucketName } = req.params;
    this.client.getSignedUrl(
      "putObject",
      { Bucket: "bucket", Key: "key" },
      function (err, url) {
        if (err) {
          res.send({ type: "Error", message: err });
        } else {
          res.send({ type: "success", url });
        }
      }
    );
  }
}

export default new ControlerS3();
