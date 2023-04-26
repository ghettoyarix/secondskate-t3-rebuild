import React from "react";
import Image from "next/image";
import { type MessageWithAuthor } from "~/server/models/messages";
const MessageUnit = ({ text, author }: MessageWithAuthor) => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 overflow-hidden rounded-full">
          {author.image ? (
            <Image
              className="rounded-full"
              alt="sss"
              src={author?.image || "/null.png"}
              fill
            ></Image>
          ) : (
            <div className="">g</div>
          )}
        </div>
      </div>
      <div className="chat-header">
        {author?.name}
        <time className="text-xs opacity-50">12:46</time>
      </div>
      <div className="chat-bubble">{text}</div>
      <div className="chat-footer opacity-50">Seen at 12:46</div>
    </div>
  );
};

export default MessageUnit;
