import React, { Component } from 'react';
import { IonList, IonItemSliding, IonItemOption, IonItemOptions, IonItem, IonLabel } from '@ionic/react';

class Cart extends Component {
  render() {
    if (this.props.cart) {
      return (
        <IonList>
          {this.props.cart.map((item) => {
            return (
              <IonItemSliding key="item.id">
                <IonItemOptions side="start">
                  <IonItemOption color="danger" onClick={ ()=> {this.props.handleDeleteItem(item)}}>Delete</IonItemOption>
                </IonItemOptions>
                <IonItem button >
                  <IonLabel position="stacked">{item.name}</IonLabel>
                  <IonLabel position="stacked">{item.quantity}x {item.price}</IonLabel>
                </IonItem>
              </IonItemSliding>
            )
          })}
        </IonList>
      )
    }
    return (
      <IonList>
        <IonLabel>Empty Cart!</IonLabel>
      </IonList>
    );
  }
}

export default Cart;
