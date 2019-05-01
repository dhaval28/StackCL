import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
  ],
  imports: [
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule, MatInputModule,
    MatCheckboxModule, MatCardModule,
    MatButtonModule, MatIconModule
  ],
  providers: [],
  bootstrap: []
})
export class MaterialModule { }
