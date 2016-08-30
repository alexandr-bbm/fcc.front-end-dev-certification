export default class AudioHelper {
    static stop(audio) {
        audio.pause();
        audio.currentTime = 0;
    }
}
