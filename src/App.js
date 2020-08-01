/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/style.css';
import products from './products.json'
import Items from './components/items';
import Cart from './components/cart';
import React, { Component } from 'react';
import { IonApp, IonItem } from '@ionic/react';
import { IonContent, IonHeader, IonPage, IonTitle, IonGrid, IonRow, IonCol, IonCard, IonFooter, IonToolbar, IonLabel, IonButton, IonBadge, IonModal, IonSegment, IonSegmentButton, IonSlides, IonSlide } from '@ionic/react';

class App extends Component {
  constructor() {
    super();
    this.slider = React.createRef();
    this.state = {
      items: products.products,
      cart: [],
      total: 0,
      count: 0,
      modalStatus: false,
      currentCategory: "all",
      categories: ["all", "groceries", "drinks", "bakery"]
    }
  }


  setShowModal(status) {    
      this.setState({
        modalStatus: status
      })
  }

  setCurrentSlide(category) {
    let categories = this.state.categories;
    this.slider.current.getSwiper().then((swiper) => {
      swiper.slideTo(categories.indexOf(category))
      this.setState({
        currentCategory: category
      })
    })
  }

  getCurrentSlide(){
    this.slider.current.getSwiper().then((swiper) => {
      this.setState({
        currentCategory: this.state.categories[swiper.activeIndex]
      })
    })
  }

  addItem(item) {
    let cart = this.state.cart;
    let items = this.state.items;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === item.id) {
        item = cart[i];
        cart.splice(i, 1);
        item = {
          id: item.id,
          name: item.name,
          quantity: item.quantity += 1,
          price: items[i].price * item.quantity
        }
      }
    }
    this.setState(
      {
        cart: this.state.cart.concat(item),
      },
      () => { this.getTotal(); }
    );
  };

  deleteItem(item) {
    let cart = this.state.cart;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id === item.id) {
        cart.splice(i, 1);
      }
    }
    this.setState(
      {
        cart: cart,
      },
      () => { this.getTotal(); }
    );
  }

  getTotal() {
    let cart = this.state.cart;
    let total = 0
    let count = 0
    for (var i = 0; i < cart.length; i++) {
      total += cart[i].price
      count += cart[i].quantity
    }
    this.setState({
      total: total,
      count: count
    })
  }

  render() {

    return (
      <IonApp>
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Ionic Cart</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent>
            <IonSegment scrollable onIonChange={(event) => { this.setCurrentSlide(event.detail.value) }} value={this.state.currentCategory}>
              {this.state.categories.map((category) => {
                return (
                  <IonSegmentButton key={category} value={category}>
                    <IonLabel>{category}</IonLabel>
                  </IonSegmentButton>
                )
              })
              }
            </IonSegment>


            <IonSlides onIonSlideDidChange={() => { this.getCurrentSlide() }} ref={this.slider}>
              {
                this.state.categories.map((category) => {
                  return (
                    <IonSlide key={category}>
                      <IonGrid>
                        <IonRow>
                          <IonCol>
                            <IonCard>
                              <Items items={this.state.items} category={category} handleAddItem={(item) => { this.addItem(item) }} />
                            </IonCard>
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonSlide>
                  )
                })
              }
            </IonSlides>

          </IonContent>

          <IonFooter onClick={() => this.setShowModal(true)}>
            <IonItem>
              <IonBadge slot="start">Items: {this.state.count}</IonBadge>
              <IonBadge slot="end" class="total">{this.state.total} </IonBadge>
            </IonItem>
          </IonFooter>
        </IonPage>

        <IonModal isOpen={this.state.modalStatus} >
          <IonCard>
            <Cart cart={this.state.cart} handleDeleteItem={(item) => { this.deleteItem(item) }} />
          </IonCard>
          <IonButton onClick={() => this.setShowModal(false)}>Close</IonButton>
        </IonModal>


      </IonApp>
    );
  }
}


export default App;
