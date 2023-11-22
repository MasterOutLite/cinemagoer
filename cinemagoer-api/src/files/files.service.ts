import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";


export enum TypeFile {
    AVATAR = 'avatar',
    VIDEO = 'video',
    TRAILER = 'trailer',
    PICTURES = 'pictures'
}

@Injectable()
export class FilesService {

    createFile(type: TypeFile, file: Express.Multer.File): string {
        try {
            //For release
            //const filePath = path.resolve(__dirname, '..', 'static', type);
            //For development
            const filePath = path.resolve(__dirname, '..', '..', 'static', type);
            const fileName = uuid.v4() + '.' + file.originalname.split('.').pop();
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true});
            }
            fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);

            return type + '/' + fileName;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    createFileSimple(type: TypeFile, name: string) {
        try {
            //read
            //const filePathToFile = path.resolve(__dirname, '..', '..', 'seed-obg', type, name);
            const filePathToFile = path.resolve(__dirname, '..', '..', 'seed-obg', type, name);
            const file = fs.readFileSync(filePathToFile,);

            //write
            const filePath = path.resolve(__dirname, '..', '..', 'static', type);
            const fileName = uuid.v4() + '.' + name.split('.').pop();
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true});
            }
            fs.writeFileSync(path.resolve(filePath, fileName), file);

            return type + '/' + fileName;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    removeFile(name: string): boolean {
        return
    }

}
