import { CameraCapturedPicture, CameraPictureOptions } from './Camera.types';
import { CameraType } from './CameraModule/CameraModule.types';
import {
  canGetUserMedia,
  isBackCameraAvailableAsync,
  isFrontCameraAvailableAsync,
} from './CameraModule/UserMediaManager';
import ExponentCamera from './ExponentCamera.web';

export default {
  get name(): string {
    return 'ExponentCameraManager';
  },
  get Type() {
    return {
      back: 'back',
      front: 'front',
    };
  },
  get FlashMode() {
    return {
      on: 'on',
      off: 'off',
      auto: 'auto',
      torch: 'torch',
    };
  },
  get AutoFocus() {
    return {
      on: 'on',
      off: 'off',
      auto: 'auto',
      singleShot: 'singleShot',
    };
  },
  get WhiteBalance() {
    return {
      auto: 'auto',
      continuous: 'continuous',
      manual: 'manual',
    };
  },
  get VideoQuality() {
    return {};
  },
  async isAvailableAsync(): Promise<boolean> {
    return canGetUserMedia();
  },

  // TODO: Bacon: Is video possible?
  // record(options): Promise
  // stopRecording(): Promise<void>
  async takePicture(
    options: CameraPictureOptions,
    camera: typeof ExponentCamera
  ): Promise<CameraCapturedPicture> {
    return await camera.takePicture(options);
  },
  async pausePreview(camera: typeof ExponentCamera): Promise<void> {
    await camera.pausePreview();
  },
  async resumePreview(camera: typeof ExponentCamera): Promise<any> {
    return await camera.resumePreview();
  },
  async getAvailableCameraTypesAsync(): Promise<string[]> {
    if (!canGetUserMedia() || !navigator.mediaDevices.enumerateDevices) return [];

    const devices = await navigator.mediaDevices.enumerateDevices();

    const types: (string | null)[] = await Promise.all([
      (await isFrontCameraAvailableAsync(devices)) && CameraType.front,
      (await isBackCameraAvailableAsync()) && CameraType.back,
    ]);

    return types.filter(Boolean) as string[];
  },
  async getAvailablePictureSizes(ratio: string, camera: typeof ExponentCamera): Promise<string[]> {
    return await camera.getAvailablePictureSizes(ratio);
  },
};
