import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { Building, HeartPulse, GraduationCap, BriefcaseBusiness, Cpu } from 'lucide-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { MissionComponent } from './mission/mission.component';
import { VissionComponent } from './vission/vission.component';
import { ClientsComponent } from './clients/clients.component';
import { WhatWeDoComponent } from './what-we-do/what-we-do.component';
import { WhyChooseUsComponent } from './why-choose-us/why-choose-us.component';
import { HeroComponent } from './hero/hero.component';
import { HomeComponent } from './home/home.component';
import { BrandValuesComponent } from './brand-values/brand-values.component';
import { WhoWeAreComponent } from './who-we-are/who-we-are.component';
import { FoundersComponent } from './founders/founders.component';
import { BodyMindSpiritComponent } from './body-mind-spirit/body-mind-spirit.component';
import { ProgramsComponent } from './programs/programs.component';
import { CorporateWellnessComponent } from './corporate-wellness/corporate-wellness.component';
import { TeamComponent } from './team/team.component';
import { EducationComponent } from './education/education.component';
import { BookConsultationComponent } from './book-consultation/book-consultation.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    MissionComponent,
    VissionComponent,
    ClientsComponent,
    WhatWeDoComponent,
    WhyChooseUsComponent,
    HeroComponent,
    HomeComponent,
    BrandValuesComponent,
    WhoWeAreComponent,
    FoundersComponent,
    BodyMindSpiritComponent,
    ProgramsComponent,
    CorporateWellnessComponent,
    TeamComponent,
    EducationComponent,
    BookConsultationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
      LucideAngularModule.pick({
      Building,
      HeartPulse,
      GraduationCap,
      BriefcaseBusiness,
      Cpu
    })
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useFactory: () => (typeof document !== 'undefined' ? document.querySelector('base')?.getAttribute('href') ?? '/' : '/')
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
