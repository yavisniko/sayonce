import { GlobalModalsContext } from "@/contexts/GlobalModalsContext";
import { useContext } from "react";
import { useIntroModal } from "./hooks/useIntroModal";
import {
  SIntroImageWrapper,
  SIntroModalH1,
  SintroModalH4,
  SIntroModalImage,
  SintroModalP,
} from "./SIntroModal.styled";
import { Modal } from "@/components/shared/Modal";
import { Button } from "@/components/shared/Button";
import { Spacer } from "@/components/shared/Spacer";
import { Checkbox } from "@/components/shared/Checkbox";

export const IntroModal = () => {
  const { introModalOpen } = useContext(GlobalModalsContext);
  const { closeHandler, earlyClose, setAgreed } = useIntroModal();

  return (
    <Modal
      preventClose
      blur
      aria-labelledby="modal-title"
      open={introModalOpen}
      width={800}
    >
      <Modal.Header>
        <div className="flex items-center justify-center">
          Welcome on
          <div className="pl-2">Sayonce 💅🏼🙄</div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div>
          <SIntroModalH1>Hey 👋🏻</SIntroModalH1>
          <SintroModalH4>
            before moving forward you must know what happens here, because I do
            lots of dark stuff here that you won&apos;t like i guess, I sell
            your personal data on dark web, okay jk 💀.
          </SintroModalH4>
          <Spacer />
          <SintroModalH4>
            please take a time and read all these, to understand what this
            platform uses for better experience
            <Spacer />
            <ul>
              <li>
                • I use cookies on this website to store user token, which allow
                us to keep you logged in and provide you with a better browsing
                experience. Cookies are small text files that are stored on your
                device when you visit our site. They help us remember your
                preferences and keep you authenticated
              </li>
              <li>• I use your Discord account for authorization</li>
              <li>
                • When you post here, we save your data
                <SintroModalP>
                  - Your Discord ID, username and avatar
                </SintroModalP>
                <SintroModalP>- Date when you posted</SintroModalP>
                <SintroModalP>
                  - All the content what you mentioned in post
                </SintroModalP>
              </li>
            </ul>
          </SintroModalH4>
          <Spacer />
          <SintroModalH4>
            If you have read all of this information and are ready to take a
            risk and try out this platform, please click the checkbox below.
          </SintroModalH4>
          <SIntroImageWrapper>
            <SIntroModalImage
              alt={"pointing gun"}
              style={{
                objectFit: "cover",
              }}
              src={
                "https://i.kym-cdn.com/photos/images/newsfeed/002/337/829/005.gif"
              }
            />
          </SIntroImageWrapper>
        </div>
        <div className="mt-3 flex items-center gap-x-2">
          <Checkbox onClick={() => setAgreed((prev) => !prev)} />
          <div>Okay, okay got it 😭</div>
        </div>
        {earlyClose && <p className="text-xs">👆 Hey kiddo you forgot this</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button style={{fontSize: '18px'}} onClick={closeHandler}>Leave me alone</Button>
      </Modal.Footer>
    </Modal>
  );
};
