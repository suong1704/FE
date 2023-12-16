import { getDownloadURL, ref } from "firebase/storage";

const loadAudioPromise = (storageFireBase: any, url: string) => {
    return new Promise<{ src: string }>((resolve, reject) => {
        getDownloadURL(ref(storageFireBase, url))
        .then((url) => {
            const audio = new Audio();
            audio.src = url;
            audio.onloadstart = () => {
                setTimeout(() => {
                    resolve({
                        src: audio.src
                    });
                }, 500);
            }
        })
        .catch((error) => {
            console.log(error);
            reject(error);
        });
    });
}

export { loadAudioPromise }