export interface UploadFile {
  file: File
  fileList: FileList[]
}

export interface File {
  uid: string
  lastModified: number
  lastModifiedDate: string
  name: string
  size: number
  type: string
  percent: number
  originFileObj: OriginFileObj
  status: string
  response: string
  xhr: Xhr
}

export interface OriginFileObj {
  uid: string
}

export interface Xhr { }

export interface FileList {
  uid: string
  lastModified: number
  lastModifiedDate: string
  name: string
  size: number
  type: string
  percent: number
  originFileObj: OriginFileObj2
  status: string
  response: string
  xhr: Xhr2
}

export interface OriginFileObj2 {
  uid: string
}

export interface Xhr2 { }

export interface RcFile extends OriRcFile {
  readonly lastModifiedDate: Date;
}

export type UploadFileStatus = 'error' | 'done' | 'uploading' | 'removed';

export interface UploadFile<T = any> {
  uid: string;
  size?: number;
  name: string;
  fileName?: string;
  lastModified?: number;
  lastModifiedDate?: Date;
  url?: string;
  status?: UploadFileStatus;
  percent?: number;
  thumbUrl?: string;
  crossOrigin?: React.ImgHTMLAttributes<HTMLImageElement>['crossOrigin'];
  originFileObj?: RcFile;
  response?: T;
  error?: any;
  linkProps?: any;
  type?: string;
  xhr?: T;
  preview?: string;
}
export interface InternalUploadFile<T = any> extends UploadFile<T> {
  originFileObj: RcFile;
}
export interface UploadChangeParam<T = UploadFile> {
  file: T;
  fileList: T[];
  event?: {
    percent: number;
  };
}
