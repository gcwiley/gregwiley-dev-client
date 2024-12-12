import { Directive, EventEmitter, HostListener, Output, input } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { filter, first, switchMap } from "rxjs";

// import the project service
import { ProjectService } from "../services/project.service";

