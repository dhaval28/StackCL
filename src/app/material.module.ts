import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule, MatTableModule, MatPaginatorModule, MatSidenavModule, MatRadioModule,
MatSnackBarModule, MatChipsModule } from '@angular/material';

@NgModule({
  declarations: [
  ],
  imports: [
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule, MatInputModule, MatSidenavModule, MatRadioModule,
    MatCheckboxModule, MatCardModule, MatPaginatorModule, MatSnackBarModule,
    MatButtonModule, MatTableModule, MatChipsModule
  ],
  providers: [],
  bootstrap: []
})
export class MaterialModule { }
