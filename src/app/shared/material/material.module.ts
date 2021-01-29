import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
// import { NgImageSliderModule } from 'ng-image-slider';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const MaterialComponets = [
	MatInputModule,
	MatButtonModule,
	MatFormFieldModule,
	FormsModule,
	ReactiveFormsModule,
	MatSelectModule,
  	MatCheckboxModule,
  	MatCardModule,
  	MatListModule,
  	MatDividerModule,
  	MatToolbarModule,
  	MatIconModule,
  	FlexLayoutModule,
	MatMenuModule,
	MatSidenavModule,
	RouterModule,
	MatGridListModule,
	MatBadgeModule,
	MatTabsModule,
	MatDatepickerModule,
	MatStepperModule,
	MatNativeDateModule,
	MatChipsModule,
	MatAutocompleteModule,
  	MatProgressSpinnerModule,
  	MatTableModule,
  	MatPaginatorModule,
 	MatTooltipModule,
	MatSlideToggleModule,
	MatExpansionModule,
	MatBottomSheetModule,
	MatDialogModule,
	MatRadioModule,
	MatDialogModule,
	MatSnackBarModule
];

@NgModule({
  exports: [MaterialComponets],
  imports: [MaterialComponets, CommonModule],
})
export class MaterialModule {}
