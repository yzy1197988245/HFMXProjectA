import {Injectable} from "@angular/core";

@Injectable()
export class SourceViewerService {
  public sourceViewerStatus = 'hide';
  public sources = [];

  public showSourceViewer(sources: Array<any>) {
    this.sourceViewerStatus = 'show';
    this.sources = sources;
  }

  public hideSourceViewer(): void {
    this.sourceViewerStatus = 'hide';
    this.sources = [];
  }
}
