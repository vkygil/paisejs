
let str = `
en                                 ;;  es                                             ;; cat                                          ;; pun                                
Total accounts                     ;;  Total de cuentas                               ;; Total de comptes                             ;; ਕੁੱਲ ਖਾਤੇ
I owe them                         ;;  Les debo                                       ;; els dec                                      ;; ਮੈਂ ਉਨ੍ਹਾਂ ਦਾ ਕਰਜ਼ਦਾਰ ਹਾਂ                                 
They owe me                        ;;  Me deben                                       ;; em deuen                                     ;; ਉਹ ਮੈਨੂੰ ਦੇਣਦਾਰ ਹਨ                                   
Search people                      ;;  Buscar personas                                ;; Buscar persones                              ;; ਲੋਕਾਂ ਦੀ ਖੋਜ ਕਰੋ                                                   
Language                           ;;  Idioma                                         ;; Idioma                                       ;; ਭਾਸ਼ਾ                            
Clear data                         ;;  Borrar datos                                   ;; Esborrar dades                               ;; ਡਾਟਾ ਸਾਫ਼ ਕਰੋ                                            
Export data                        ;;  Exportar datos                                 ;; Exportar dades                               ;; ਡਾਟਾ ਨਿਰਯਾਤ ਕਰੋ                                               
Transactions                       ;;  Transacciones                                  ;; Transaccions                                 ;; ਲੈਣ-ਦੇਣ                                             
to give                            ;;  Para darle                                     ;; per donar-li                                 ;; ਨੂੰ ਦੇਣ ਲਈ                                     
Change name                        ;;  Cambiar nombre                                 ;; Canviar nom                                  ;; ਨਾਮ ਬਦਲੋ                                            
Remove                             ;;  Eliminar                                       ;; Eliminar                                     ;; ਹਟਾਓ                              
Please enter the person's name     ;;  Por favor, introduzca el nombre de la persona. ;; Si us plau, introduïu el nom de la persona.  ;; ਕਿਰਪਾ ਕਰਕੇ ਵਿਅਕਤੀ ਦਾ ਨਾਮ ਦਰਜ ਕਰੋ                                                                                                                               
Take                               ;;  Tomar                                          ;; Prendre                                      ;; ਲਓ                        
Give                               ;;  Entregar                                       ;; Lliurar                                      ;; ਦਿਓ                           
Amount                             ;;  Cantidad                                       ;; Quantitat                                    ;; ਦੀ ਰਕਮ                               
Date                               ;;  Fecha                                          ;; Data                                         ;; ਤਾਰੀਖ਼                     
Message                            ;;  Mensaje                                        ;; Missatge                                     ;; ਸੁਨੇਹਾ                              
Delete                             ;;  Borrar                                         ;; Esborrar                                     ;; ਮਿਟਾਓ                            
Close                              ;;  Cerrar                                          ;; A prop                                       ;; ਬੰਦ ਕਰੋ                        
Save                               ;;  Guardar                                         ;; Salvar                                       ;; ਸੇਵ ਕਰੋ                        
Add transaction                    ;;  Añadir transacción                             ;; Afegir transacció                            ;; ਲੈਣ-ਦੇਣ ਸ਼ਾਮਲ ਕਰੋ                                                          
Change name                        ;;Cambiar nombre                                   ;; Canviar nom                                  ;;  Naam badlna
Please write the amount correctly  ;; Por favor escriba la cantidad correctamente     ;;Escriviu correctament l'import                ;; ਕਿਰਪਾ ਕਰਕੇ ਰਕਮ ਸਹੀ ਲਿਖੋ
`
let messagesX = {}
let strX = str.split("\n")
let headers = strX[1].split(";;").map(x => x.trim())
let body = strX.slice(2, -1).map(x => x.split(";;").map(x => x.trim()))

for (const i in headers) {
    messagesX[headers[i]] = {}
    body.map(x => { messagesX[headers[i]][x[0]] = x[i] })
}
console.log(messagesX);
export const messages = messagesX
export const messagesx = {
    en: {
        Totalaccounts: 'hello world'
    },
    es: {
        Totalaccounts: 'こんにちは、世界'
    }
}
 