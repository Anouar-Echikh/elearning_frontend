import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  Input,
  InputGroup,
  ModalBody,
  ModalFooter,
  InputGroupAddon
} from "reactstrap";

class ForgotPasswordModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <Button
          color="link"
          style={{ textDecorationLine: " none" }}
          className="px-0 mt-2 ml-3 pb-0"
          onClick={this.toggle}
        >
          Informations de compte oubliées ?
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          centered
        >
          <ModalHeader toggle={this.toggle}>Récupérer votre compte</ModalHeader>
          <ModalBody>
            Pour récupérer votre mot de passe, veuillez entrer votre e-mail de
            récupération :
            <br />
            votre e-mail semble : <label>an***@l.f**</label>
            <InputGroup>
              <InputGroupAddon addonType="prepend">@</InputGroupAddon>
              <Input placeholder="Email" />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Récupérer
            </Button>{" "}
            <Button color="secondary" className=" card-btn">
              Annuller
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ForgotPasswordModal;
