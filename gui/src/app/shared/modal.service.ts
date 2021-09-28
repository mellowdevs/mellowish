import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal) {
  }

  modalCallback: any;
  closeResult: string;

  public open(content, modalData?, size?, callback?) {
    const currentModal = this.modalService
      .open(content, {
        size: size ? size : 'lg',
        backdrop: 'static',
        backdropClass: 'dark-backdrop',
        centered: true,
        scrollable: true,
        windowClass: 'dark-modal',
        keyboard: false
      });
    currentModal.componentInstance.modalData = modalData;
    this.modalCallback = callback;
    currentModal.result.then((result) => {
      if (this.modalCallback) {
        this.modalCallback();
      }
    }, (reason) => {
      if (this.modalCallback) {
        this.modalCallback();
      }
    });
  }
}
