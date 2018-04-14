import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AddShoppingPage } from '../add-shopping/add-shopping';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { EditShoppingItemPage } from '../edit-shopping-item/edit-shopping-item';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingListRef$: FirebaseListObservable<ShoppingItem[]>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private database: AngularFireDatabase,
    private actionSheetCtrl: ActionSheetController
  ) {
    this.shoppingListRef$ = this.database.list('shopping-list');
  }

  selectShoppingItem(shoppingItem: ShoppingItem) {
    this.actionSheetCtrl.create({
      title: `${shoppingItem.itemName}`,
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            this.navCtrl.push(EditShoppingItemPage, { shoppingItemId: shoppingItem.$key });
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.shoppingListRef$.remove(shoppingItem.$key);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('User select cancel');
          }
        }
      ]
    }).present();
  }

  navigateToAddShoppingPage() {
    this.navCtrl.push(AddShoppingPage);
  }

}
