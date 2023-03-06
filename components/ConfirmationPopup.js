import React, { useState } from 'react';
import { View, Button, Alert } from 'react-native';

const ConfirmationPopup = ({ message, confirmText, cancelText, onConfirm, onCancel}) => {
  const [visible, setVisible] = useState(true);

  function handleConfirm (){
    setVisible(false);
    onConfirm();
  };

  function handleCancel  () {
    setVisible(false);
    onCancel();
  };
  

  return (
    <View>
       {(
        Alert.alert(
          'Confirmação',
          message,
          [
            {text: cancelText, onPress: handleCancel, style: 'cancel'},
            {text: confirmText, onPress: handleConfirm}
          ]
        )
      )}
    </View>
  );
};

export default ConfirmationPopup;
