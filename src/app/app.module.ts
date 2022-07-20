import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HighchartsChartModule } from 'highcharts-angular';

import { AppComponent } from './app.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { BoxChartComponent } from './box-chart/box-chart.component';
import { SelectDropdownComponent } from './common/select-dropdown/select-dropdown.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './common/filter-pipe/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PieChartComponent,
    BarChartComponent,
    BoxChartComponent,
    SelectDropdownComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
