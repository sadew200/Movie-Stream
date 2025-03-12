// import { Component } from '@angular/core';
// import { ChatbotService } from '../../services/chatbot.service';
// import { FormsModule } from '@angular/forms';
// import { NgFor, NgIf } from '@angular/common';

// @Component({
//   selector: 'app-guide',
//   standalone: true,
//   imports: [FormsModule,NgFor,NgIf],
//   templateUrl: './guide.component.html',
//   styleUrl: './guide.component.css'
// })
// export class GuideComponent {
//   messages: { user: string, bot: string }[] = [];
//   userMessage = '';

//   constructor(private chatbotService: ChatbotService) {}

//   sendMessage() {
//     if (this.userMessage.trim() === '') return;

//     const userText = this.userMessage;
//     this.messages.push({ user: userText, bot: '...' }); // Show loading

//     this.chatbotService.sendMessage(userText).subscribe(response => {
//       this.messages[this.messages.length - 1].bot = response.reply;
//     });

//     this.userMessage = '';
//   }
// }






import { Component, ViewChild, ElementRef } from '@angular/core';
import { ChatbotService } from '../../services/chatbot.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, HeaderComponent],
  templateUrl: './guide.component.html',
  styleUrl: './guide.component.css'
})
export class GuideComponent {
  messages: { user: string; bot: string }[] = [];
  userMessage = '';
  isTyping = false;

  @ViewChild('chatContainer') chatContainer!: ElementRef;

  constructor(private chatbotService: ChatbotService) {}

  sendMessage() {
    if (!this.userMessage.trim()) return;

    const userText = this.userMessage;
    this.messages.push({ user: userText, bot: '...' });
    this.isTyping = true;
    this.userMessage = '';

    setTimeout(() => this.scrollToBottom(), 50);

    this.chatbotService.sendMessage(userText).subscribe(response => {
      this.isTyping = false;
      this.messages[this.messages.length - 1].bot = response.reply;
      this.scrollToBottom();
    });
  }

  private scrollToBottom() {
    setTimeout(() => {
      if (this.chatContainer) {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }
    }, 50);
  }
}



