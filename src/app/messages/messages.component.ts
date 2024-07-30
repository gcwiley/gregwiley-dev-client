import { Component } from '@angular/core';

// fix this!

// import the message service
import { MessageService } from '../services/message.service';

@Component({
   selector: 'app-messages',
   templateUrl: './messages.component.html',
   styleUrls: ['./messages.component.css'],
   standalone: true,
})
export class MessagesComponent {
   constructor(public messageService: MessageService) {}
}
