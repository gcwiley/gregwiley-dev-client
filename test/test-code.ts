private handleError(operation = 'operation', result?: any) {
  return (error: HttpErrorResponse): Observable<any> => {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      if (error.status === 0) {
        errorMessage = `A problem occurred while trying to contact the server. Please check your internet connection and try again later.`;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }

    console.error(errorMessage); 

    // You can display a user-friendly error message here
    this.messageService.add(`ProjectService: ${operation} failed: ${errorMessage}`);

    // Let the app keep running by returning an empty result or an observable with an error
    return throwError(() => new Error(errorMessage)); 
  };
}