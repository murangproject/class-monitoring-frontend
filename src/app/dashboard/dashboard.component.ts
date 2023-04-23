import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  rooms: any = ['Room 101','Room 102','Room 103','Room 104','Room 105','Room 106','Room 107','Room 108','Room 109','Room 110',
                'Room 111','Room 112','Room 113','Room 114','Room 115','Room 116','Room 117','Room 118','Room 119','Room 120'];
}
