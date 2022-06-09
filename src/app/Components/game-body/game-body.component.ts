import { Component, Input, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { HeaderComponent } from '../Shared/header/header.component';

@Component({
  selector: 'app-game-body',
  templateUrl: './game-body.component.html',
  styleUrls: ['./game-body.component.css']
})
export class GameBodyComponent implements OnInit {


  //Main variables

  @ViewChild(HeaderComponent) HeaderComp: HeaderComponent
  @ViewChild('Icons') MainContianer: any;
  duration: number = 500;
  AllFlipedBlocks: HTMLElement[] = [];
  allDifficulties: string[] = ["Easy", "Medium", "Hard"]
  allCardLeftNums: number[] = [10, 20, 30]
  @Input("Diff") Diff: any;

  constructor() {
    this.HeaderComp = new HeaderComponent;
  }

  ngOnInit(): void {
    // diff Init
    let CurrDef = localStorage.getItem("Difficulty")
    if (!CurrDef || CurrDef == "")
      this.Diff = 0
    else
      this.Diff = CurrDef
  }

  //flip card
  flip(): void {
    let AllBlocks = Array.from(this.MainContianer.nativeElement.children)

    for (let block of AllBlocks) {
      let curr = (block as HTMLElement)

      curr.addEventListener("click", () => {
        curr.classList.add("fliped")
        if (curr.classList.contains("fliped")) {
          this.AllFlipedBlocks.push(curr)
        }
        if (this.AllFlipedBlocks.length === 2) {
          this.preventClicking()
          this.IsMatch(this.AllFlipedBlocks[0], this.AllFlipedBlocks[1])
        }
          this.HeaderComp.playSound(0)
      })
    }
  }

  IsMatch(firstBlock: HTMLElement, SecondBlock: HTMLElement): void {
    if (firstBlock.dataset["icon"] === SecondBlock.dataset["icon"]) {
      firstBlock.classList.remove("fliped")
      SecondBlock.classList.remove("fliped")
      firstBlock.classList.add("Matched")
      SecondBlock.classList.add("Matched")
      this.isWin()
      this.HeaderComp.playSound(1)
    } else {
      setTimeout(() => {
        firstBlock.classList.remove("fliped")
        SecondBlock.classList.remove("fliped")
      }, this.duration)
      this.HeaderComp.playSound(2)
    }
    this.AllFlipedBlocks = [];
  }

  isWin(): void {
    this.allCardLeftNums[this.Diff]--
    if (this.allCardLeftNums[this.Diff] <= 0) {
      this.WinAndAskToReplay()
      this.HeaderComp.playSound(3)
    }
  }

  WinAndAskToReplay(): void {
    setTimeout(() => {
      Swal.fire({
        title: 'Congrats You win!',
        text: "Do you want to play again?",
        position: 'center',
        icon: 'success',
        showConfirmButton: true,
        timer: 8000,
        timerProgressBar: true,
        showCancelButton: true,
        cancelButtonText: 'No',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Play'
      }).then(result => {
        if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer)
          location.reload();
      })
    }, this.duration)
  }

  preventClicking(): void {
    let Main = this.MainContianer.nativeElement
    Main.classList.add("preventClicking")

    setTimeout(() => {
      Main.classList.remove("preventClicking")
    }, this.duration)
  }

  IsSolved(): void {
    this.AllFlipedBlocks[1].classList.add("Always-fliped")
    this.AllFlipedBlocks[0].classList.add("Always-fliped")
  }

  shuffle(array: Array<number>): Array<number> {
    let current = array.length;
    let tmp, random;

    while (current > 0) {
      random = Math.floor(Math.random() * current)
      current--;
      tmp = array[current];
      array[current] = array[random];
      array[random] = tmp;
    }
    return array;
  }

  render() {
    // must be in js way to detect all current elements depending on deff when calling the fuction
    let Icons = document.querySelector("#Icons")
    let cards = Array.from(Icons!.children)
    let OrderElements = [...Array(cards.length).keys()]
    this.shuffle(OrderElements);
    for (const [index, card] of cards.entries()) {
      (card as HTMLElement).style.order = OrderElements[index].toString();
    }
    this.flip()
  }

  ConsoleWarning(): void {
    console.warn("Note: this console is for developers only, and any mistake here may cause errors in the game")
  }

  ngAfterViewInit() {
    this.ConsoleWarning()
    this.HeaderComp = new HeaderComponent;
  }
}