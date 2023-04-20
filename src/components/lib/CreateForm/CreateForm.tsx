import { PaddedWrapper } from "@/components/shared/PaddedWrapper";
import { Card, Image, Loading } from "@nextui-org/react";
import { Button } from "@/components/shared/Button";
import {
  SCreateWrapper,
  SCreateForm,
  SCardWrapper,
  STextCenter,
  SLoadingScreen,
  SText,
  SGifCard,
} from "./SCreateForm.styled";
import { EmojiSpam } from "@/components/shared/EmojiSpam";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { GifModal } from "./modals/GifModal/GifModal";
import { values } from "./template";
import { useValidate } from "./hooks/useValidate";
import { ConfirmModal } from "./modals/ConfirmModal";
import { AuthModal } from "./modals/AuthModal";
import { AUTH_STAGE_ENUM, AuthContext } from "@/contexts/AuthContext";
import { SuccessModal } from "./modals/SuccessModal";
import { api } from "@/utils/api";
import { PostCooldownModal } from "./modals/PostCooldownModal";
import { Input } from "@/components/shared/Input";
import { Textarea } from "@/components/shared/Textarea";
import { errorMessage } from "./utils/errorMessage.utils";

export const CreateForm = () => {
  const [formValues, setFormValues] = useState(values);
  const [submited, setSubmited] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const { errors } = useValidate(formValues);
  const { authStage } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const {
    mutate: isPostMutate,
    isError,
    isLoading: postLoading,
    error,
  } = api.postAbility.useMutation();

  useEffect(() => {
    isPostMutate();
  }, []);

  useEffect(() => {
    document.body.style.overflow = "visible";
  }, [openConfirmModal, openModal]);

  const inputHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;

    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmited(true);

    if (Object.keys(errors).length > 0) return;

    setOpenConfirmModal(true);
  };

  if (postLoading) {
    return (
      <SLoadingScreen>
        <Loading size="xl" color={"white"} />
        <p>Please waitt... 😭</p>
      </SLoadingScreen>
    );
  }

  if (authStage === AUTH_STAGE_ENUM.UNAUTHORIZED) {
    return <AuthModal />;
  }

  if (success) {
    return <SuccessModal />;
  }

  if (isError) {
    return <PostCooldownModal date={error.message} />;
  }

  return (
    <PaddedWrapper>
      <ConfirmModal
        setSuccess={() => setSuccess(true)}
        form={formValues}
        openModal={openConfirmModal}
        setOpenModal={() => setOpenConfirmModal(false)}
      />
      <GifModal
        setGif={(gif) => {
          setFormValues((prev) => ({ ...prev, gif }));
          setOpenModal(false);
        }}
        openModal={openModal}
        setOpenModal={() => setOpenModal(false)}
      />
      <SCreateForm onSubmit={submitHandler}>
        <SCreateWrapper>
          <Input
            label="Title"
            name="title"
            onChange={inputHandler}
            errorMessage={errorMessage({
              text: errors.title as string,
              submited,
            })}
          />
          <Textarea
            label="Description"
            maxLength={500}
            name="description"
            onChange={inputHandler}
            errorMessage={errorMessage({
              text: errors.description as string,
              submited,
            })}
          />
          <SCardWrapper>
            <SText
              style={{ fontSize: "1.124rem", marginBottom: "4px" }}
              errorMessage={
                !!errorMessage({
                  text: errors.gif as string,
                  submited,
                })
              }
              b
            >
              Gif
            </SText>
            <SGifCard
              errorMessage={
                !!errorMessage({
                  text: errors.gif as string,
                  submited,
                })
              }
              onClick={() => setOpenModal(true)}
              className="gif-card p-8"
            >
              {formValues?.gif ? (
                <Image
                  src={formValues.gif}
                  className="rounded-2xl"
                  alt="content gif"
                />
              ) : (
                <>
                  <EmojiSpam />
                  <STextCenter>
                    <SText style={{ fontSize: "1.2rem" }} b>
                      Search GIF
                    </SText>
                  </STextCenter>
                </>
              )}
            </SGifCard>
          </SCardWrapper>
          <SCardWrapper>
            <Button>Post ✨</Button>
          </SCardWrapper>
        </SCreateWrapper>
      </SCreateForm>
    </PaddedWrapper>
  );
};
