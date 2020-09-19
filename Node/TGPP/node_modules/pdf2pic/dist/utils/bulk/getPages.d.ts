/// <reference types="node" />
import { Graphics } from "@module/graphics";
import { ReadStream } from "fs-extra";
export declare function getPages(gm: Graphics, pdf_path: ReadStream): Promise<number[]>;
