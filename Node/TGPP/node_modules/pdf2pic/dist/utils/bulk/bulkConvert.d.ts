/// <reference types="node" />
import { Graphics } from "@module/graphics";
import { WriteImageResponse } from "@module/types/writeImageResponse";
import { ToBase64Response } from "@module/types/toBase64Response";
export declare function bulkConvert(gm: Graphics, source: string, filePath: string | Buffer, pageNumber?: number | number[], toBase64?: boolean): Promise<WriteImageResponse[] | ToBase64Response[]>;
