import React from "react";

interface SendMessage {
  (message: any): void;
}

class Participant {
  name: string;
  sendMessage: SendMessage;
  container: HTMLDivElement;
  video: HTMLVideoElement;
  span: HTMLSpanElement;
  rtcPeer: any | null | undefined;

  constructor(me: string, name: string, sendMessage: SendMessage) {
    this.name = name;
    this.sendMessage = sendMessage;
    this.container = document.createElement("div");
    this.container.className =
      "w-[400px] h-[300px] bg-cover rounded-[20px] shadow-lg flex flex-col items-center justify-center"; // Tailwind CSS 클래스 사용
    this.container.id = name;

    this.video = document.createElement("video");
    this.span = document.createElement("span");
    this.rtcPeer = null;

    this.span.appendChild(document.createTextNode(name));
    this.span.className = "text-[16px] mt-2 text-white"; // Tailwind CSS 클래스 사용

    this.container.appendChild(this.video);
    this.container.appendChild(this.span);
    this.container.onclick = this.switchContainerClass.bind(this);

    if (me !== name) {
      const participantsElement = document.getElementById("participants");
      if (participantsElement) {
        participantsElement.appendChild(this.container);
      }
    }

    this.video.id = "video-" + name;
    this.video.className = "w-full h-full object-cover transform scale-x-[-1]"; // Tailwind CSS 클래스 사용
    this.video.autoplay = true;
    this.video.controls = false;
  }

  getElement(): HTMLDivElement {
    return this.container;
  }

  getVideoElement(): HTMLVideoElement {
    return this.video;
  }

  switchContainerClass(): void {
    if (this.container.classList.contains("main")) {
      const elements = Array.from(
        document.getElementsByClassName("main")
      ) as HTMLDivElement[];
      elements.forEach((item) => {
        item.classList.remove("main");
      });
      this.container.classList.add("main");
    } else {
      this.container.classList.remove("main");
    }
  }

  isPresentMainParticipant(): boolean {
    return document.getElementsByClassName("main").length !== 0;
  }

  offerToReceiveVideo(error: any, offerSdp: any): void {
    if (error) {
      return console.error("SDP offer error");
    }
    console.log("Invoking SDP offer callback function");

    const msg = {
      id: "receiveVideoFrom",
      sender: this.name,
      sdpOffer: offerSdp,
    };
    if (!this.name) {
      console.error("Sender is missing while receiving video.");
      return;
    }
    this.sendMessage(msg);
  }

  onIceCandidate(candidate: any): void {
    // console.log("Local candidate" + JSON.stringify(candidate));

    const message = {
      id: "onIceCandidate",
      candidate: candidate,
      name: this.name,
    };

    this.sendMessage(message);
  }

  dispose(): void {
    // console.log("Disposing participant " + this.name);
    if (this.rtcPeer) {
      this.rtcPeer.dispose();
    }
    if (this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
}

export default Participant;
