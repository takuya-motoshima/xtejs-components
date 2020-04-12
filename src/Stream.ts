export default class {

  /**
   * Open video stream
   * 
   * @param  {HTMLVideoElement} video
   * @param  {Object} constraints
   * @return {void}
   */
  public static async open(video: HTMLVideoElement, constraints: Object): Promise<void> {
    await new Promise(async (resolve, reject) => {

      try {

        // Stop all tracks that make up the stream
        this.close(video);

        // ask user for access to their camera
        video.srcObject = await navigator.mediaDevices.getUserMedia(constraints);

        // Wait for completion of loading metadata
        video.addEventListener('loadedmetadata', () => resolve(), { once: true });

        // Resources could not be loaded due to errors
        video.addEventListener('error', () => reject(video.error), { once: true });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Close video stream
   * 
   * @param  {HTMLVideoElement} video
   * @return {void}
   */
  public static close(video: HTMLVideoElement): void {
    if (!video.srcObject) {
      return;
    }
    for (let track of (<MediaStream>video.srcObject).getTracks()) {
      track.stop();
    }
    video.srcObject = null;
  }

}
