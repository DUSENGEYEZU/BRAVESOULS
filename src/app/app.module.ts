import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
    TeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      LucideAngularModule.pick({
      Building,
      HeartPulse,
      GraduationCap,
      BriefcaseBusiness,
      Cpu
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
