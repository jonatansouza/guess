import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'page-luck',
  templateUrl: 'luck.html'
})
export class LuckPage {
  luckForm: FormGroup;
  numbers: number[];

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public alertCtrl: AlertController) {
    this.luckForm = this.formBuilder.group({
      qtd: ['', Validators.required],
      limit: ['', Validators.required]
    });
  }

  submitParams() {
    let qtd: number;
    let limit: number;
    let i: number;

    qtd = this.luckForm.value.qtd;
    limit = this.luckForm.value.limit;

    if (qtd >= limit) {
      let alert = this.alertCtrl.create({
        title: 'Erro!',
        subTitle: 'O numero Máximo deve ser maior que a quantidade de números a sortear!',
        buttons: ['OK'],
        cssClass: 'alertDanger'
      });
      alert.present();
    } else {
    this.numbers = new Array<number>();
      for (i = 0; i < qtd; i++) {
        let number: number;
        number = this.sortNumbers(limit);
        while (this.numbers.indexOf(number) > (-1)) {
          number = this.sortNumbers(limit);
        }
        this.numbers.push(number);
      }
      this.numbers.sort((a, b) => {
        return a - b
      });
    }
  }

  sortNumbers(limit: number) {
    return Math.floor(Math.random() * (limit - 1 + 1)) + 1;
  }
}
