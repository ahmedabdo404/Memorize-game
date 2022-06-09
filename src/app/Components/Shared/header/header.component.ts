import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  //Main variables
  @Input("User") User: any;
  Audios: any = []
  AutoPlayAudio: boolean = true

  reload(): void {
    Swal.fire({
      title: 'Are you sure to restart the game?',
      text: "your current Progress will be lost!",
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, restart'
    }).then(result => {
      if (result.isConfirmed)
        location.reload();
    })
  }

  changeUserName(): void {
    Swal.fire({
      title: 'Change User Name',
      input: 'text',
      inputValue: "",
      showCancelButton: true,
      cancelButtonColor: '#d33',
    })

      .then(result => {
        if (result.isConfirmed) {
          if (result.value === "" || result.value == null) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Please enter a valid User Name!',
            })
          }
          else {
            localStorage.setItem("UserName", result?.value)
            this.User = result?.value;
          }
        }
      })
  }

  ToogleAudio(): void {
    let IsSoundOn = localStorage.getItem("Sound")
    if (IsSoundOn == "true"){
      localStorage.setItem("Sound", "false")
      this.AutoPlayAudio = false
    }
    else{
      localStorage.setItem("Sound", "true")
      this.AutoPlayAudio = true
    }
  }

  playSound(SoundNum: number): void {
    let IsSoundOn = localStorage.getItem("Sound")
    this.Audios = document.querySelectorAll("audio")
    if (IsSoundOn == "true") {
      switch (SoundNum) {
        // flip
        case 0:
          this.Audios[0].play()
          break;
        // Match
        case 1:
          this.Audios[1].play()
          break;
        // NotMatch  
        case 2:
          this.Audios[2].play()
          break;
        // win 
        case 3:
          this.Audios[3].play()
          break;
      }
    }
  }

  changeDiff(): void {
    let Difficulties = ["Easy", "Medium", "Hard"]
    const Input = Swal.fire({
      title: 'Change Difficulty',
      input: 'radio',
      inputOptions: Difficulties,
      showCancelButton: true,
      cancelButtonColor: '#d33',
    }).then(
      result => {
        if (result.value) {
          localStorage.setItem("Difficulty", result.value)
          console.log("Difficulty has been set to", result.value)
          Swal.fire({
            html: `You selected: ${Difficulties[result.value]}`,
            timer: 5000,
            timerProgressBar: true,
          })
            .then(reload => {
              if (result.isConfirmed || reload.dismiss === Swal.DismissReason.timer)
                location.reload();
            })
        }
      }
    )
  }

  ngOnInit(): void {
    let UserNameInLs = localStorage.getItem("UserName")
    if (UserNameInLs === null || UserNameInLs === "")
      this.User = "Guest";
    else {
      this.User = UserNameInLs;
    }

    let Volume = localStorage.getItem("Sound")
    if (Volume == "true")
      this.AutoPlayAudio = true
    else
      this.AutoPlayAudio = false
  }

  ngAfterViewInit() {
    // Initialize the Audio Elements After Comp rendering
    this.Audios = document.querySelectorAll("audio")
    // set Audio volume
    for (const a of this.Audios) {
      a.volume = 0.25
      console.log("Volume is:", a.volume);
    }
  }

}
