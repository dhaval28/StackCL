import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule, MatTableModule, MatPaginatorModule, MatSidenavModule, MatRadioModule,
MatSnackBarModule } from '@angular/material';

@NgModule({
  declarations: [
  ],
  imports: [
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule, MatInputModule, MatSidenavModule, MatRadioModule,
    MatCheckboxModule, MatCardModule, MatPaginatorModule, MatSnackBarModule,
    MatButtonModule, MatTableModule
  ],
  providers: [],
  bootstrap: []
})
export class MaterialModule { }
