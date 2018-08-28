import { Component, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('f') signForm: NgForm;
  defaultQuestion = 'pet';
  answer: '';
  genders = ['male', 'female'];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signForm.setValue({
    //   gender: 'male',
    //   questionAnswer: '',
    //   secret: 'pet',
    //   userData: {
    //     email: 'allan.barros@gmail.com',
    //     username: 'Superuser'
    //   }
    // });

    this.signForm.form.patchValue({
      userData: {
            username: suggestedName
          }
    });
  }

  // onSubmit(form: NgForm) {
  //   console.log('NgForm', form);
  // }
  onSubmit() {
    // console.log(this.signForm);
    this.submitted = true;
    this.user.username = this.signForm.value.userData.username;
    this.user.email = this.signForm.value.userData.email;
    this.user.secretQuestion = this.signForm.value.secret;
    this.user.answer = this.signForm.value.questionAnswer;
    this.user.gender = this.signForm.value.gender;
  }
}
