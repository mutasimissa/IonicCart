import React, { Component } from 'react';
import { IonList, IonItem, IonLabel, IonChip } from '@ionic/react';

class Items extends Component {
  render() {
    if (this.props.items) {
      return (
        <IonList>
          {this.props.items.map((item) => {
            if ( this.props.category === "all"){
              return (
                <IonItem button key={item.id} onClick={() => { this.props.handleAddItem(item) }}>
                  <IonLabel position="stacked">{item.name}</IonLabel>
                  <IonLabel position="stacked">{item.price}</IonLabel>
                  <IonChip slot="end">{item.category}</IonChip>
                </IonItem>
              )
            } else if (item.category === this.props.category) {
              return (
                <IonItem button key={item.id} onClick={() => { this.props.handleAddItem(item) }}>
                  <IonLabel position="stacked">{item.name}</IonLabel>
                  <IonLabel position="stacked">{item.price}</IonLabel>
                </IonItem>
              )
              
            }
    })}
        </IonList>
      );
    }
    return (
      <IonList>
        <IonLabel>Add Products!</IonLabel>
      </IonList>
    );
  }
}

export default Items;
