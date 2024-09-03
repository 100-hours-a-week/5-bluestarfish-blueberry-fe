export async function checkMediaPermissions(): Promise<{
  camera: boolean;
  microphone: boolean;
}> {
  let cameraEnabled = false;
  let microphoneEnabled = false;

  try {
    // 카메라 권한 확인
    const cameraPermission = await navigator.permissions.query({
      name: "camera" as PermissionName,
    });
    cameraEnabled = cameraPermission.state === "granted";

    // 마이크 권한 확인
    const microphonePermission = await navigator.permissions.query({
      name: "microphone" as PermissionName,
    });
    microphoneEnabled = microphonePermission.state === "granted";
  } catch (error) {
    console.error("Error checking media permissions:", error);
  }

  return { camera: cameraEnabled, microphone: microphoneEnabled };
}
