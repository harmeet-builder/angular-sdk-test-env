// fails because type imports cannot be injected
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Component, ChangeDetectorRef } from '@angular/core';
import { _processContentResult, fetchOneEntry } from '@builder.io/sdk-angular';

interface BuilderProps {
  apiVersion: string;
  canTrack?: boolean;
  trustedHosts?: undefined;
  apiKey: string;
  model: string;
  content: any;
}

@Component({
  selector: 'app-root',
  template: `
    <content-variants
      [model]="model"
      [content]="content"
      [apiKey]="apiKey"
    ></content-variants>
  `,
})
export class AppComponent {
  title = 'angular';
  apiKey: BuilderProps['apiKey'] = 'ad30f9a246614faaa6a03374f83554c9';
  model: BuilderProps['model'] = 'page';
  content: BuilderProps['content'];

  constructor(private cdr: ChangeDetectorRef) {}

  async ngOnInit() {
    // const urlPath = window.location.pathname || '';

    const builderContent = await fetchOneEntry({
      model: 'page',
      apiKey: 'ad30f9a246614faaa6a03374f83554c9',
      userAttributes: {
        urlPath: '/angular-test',
      },
    });

    if (!builderContent) {
      return;
    }

    this.content = builderContent;

    this.cdr.detectChanges();
  }
}
