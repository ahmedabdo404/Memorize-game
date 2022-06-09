import { Component, ViewChild } from '@angular/core';
import { GameBodyComponent } from './Components/game-body/game-body.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // main vars
  @ViewChild(GameBodyComponent)
  GameComp: GameBodyComponent = new GameBodyComponent;
  @ViewChild('startDiv') startDiv?: any;
  UserName: any = ""
  CurrDiff: any = ""

  PreventContextMenu(e: Event): void {
    e.preventDefault();
  }

  async StartGame(): Promise<void> {
    this.startDiv.nativeElement.remove()
    //chk on username in localstorage
    let UserNameInLs = localStorage.getItem("UserName")
    if (!UserNameInLs || UserNameInLs == "") {
      const Input = await Swal.fire({
        title: 'Enter your name',
        input: 'text',
        inputValue: "",
      })
      if (Input.value != undefined || Input.value == "") {
        localStorage.setItem("UserName", Input.value)
        this.UserName = localStorage.getItem("UserName")
        console.log("username is:", this.UserName);
      } else {
        console.log("username is: Guest");
      }
    }
    //chk on Difficulty in localstorage
    let DiffInLs = localStorage.getItem("Difficulty")
    if (!DiffInLs || DiffInLs === "") {
      await this.SelectDifficulty()
    }

    let Volume = localStorage.getItem("Sound")
    if (!Volume) {
      this.setAudio()
    }

    this.NewRender()
  }

  async SelectDifficulty(): Promise<void> {
    let Difficulties = ["Easy", "Medium", "Hard"]
    const Input = await Swal.fire({
      title: 'Select Difficulty',
      input: 'radio',
      inputOptions: Difficulties
    })

    if (Input.value) {
      Swal.fire({ html: `You selected: ${Difficulties[Input.value]}` })
      localStorage.setItem("Difficulty", Input.value)
    } else {
      Swal.fire({ html: `Difficulty has been set to easy automatically ` })
      localStorage.setItem("Difficulty", "0")
    }
    this.CurrDiff = localStorage.getItem("Difficulty")
    console.log("Difficulty is:", this.CurrDiff == "" || !Input.value ? "Easy(Auto)" : Difficulties[Input.value])
  }

  NewRender(): void {
    // wait to call stack to finsh then render all elelments even after diff select 
    setTimeout(() => {
      this.GameComp.render()
    }, 0)
  }

  setAudio(): void {
    localStorage.setItem("Sound", "true")
  }
}
