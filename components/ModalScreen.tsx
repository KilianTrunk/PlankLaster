import React from "react";
import { Modal } from "react-native";

interface Props {
  visible: boolean;
  closeModal: () => void;
  component: React.ComponentType<any>;
  componentProps?: any;
}

const ModalScreen = (props: Props) => {
  const { visible, closeModal, component: Component, componentProps } = props;

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
    >
      <Component closeModal={closeModal} {...componentProps} />
    </Modal>
  );
};

export default ModalScreen;