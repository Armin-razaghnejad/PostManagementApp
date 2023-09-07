import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-loading',
    template: `
        <div>
            LoadingComponent
        </div>
    `,
    standalone: true
})
export class LoadingComponent {
    @Input() loading = false;
}
