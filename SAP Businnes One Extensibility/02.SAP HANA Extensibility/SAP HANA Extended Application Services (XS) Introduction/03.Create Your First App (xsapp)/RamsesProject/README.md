# Creación de Primero proyecto xsapp

## SAP HANA Web-based Development Workbench: Editor

- Dar clic derecho sobre la carpeta *"Content"* y elegir ***New -> Package***
- Procedemos a nombrar nuestro nuevo paquete.
- Dar clic derecho sobre el nuevo pquete creado y elegir ***Create Application***
  - No aseguramos que en la opción *Template* esté elegido ***Empty application (with XSAccess and XSApp)***
  - Creamos el paquete con *Create*
  
Posteriormente a esto, podremos notar que se han creado tres archivos principales:
  - .xsaccess
  - .xsapp 
  - index.html 

Los dos primeros son propios de HANA, el primero define los permisos y el segundo le indica a HANA que la carpeta es el root del directorio de la aplicación SAP HANA XS, así todos los archivos en él y en los subdirectorios pueden ser accesdaos, por lo que si se elimina, no se podrán ser accesibles vía URL.
  
A continuación podremos agregar los archivos que creamos anteriormente, tanto el archivo **test.html** como **sample.js** los cuales ya deben estar previamente comprimidos.

  - Hacemos clic derechos sobre nuestro paquete y buscamos la opción ***Import -> Archive***
  - Buscamos nuestro archivo *zip* y damos clic en ***Import***

Los arcihvos ahora aparecen en nuestro entorno, por lo que podemos ejecutar nuestra aplicación haciendo clic sobre el ícono en la barra superior **Run** o presionando simplemente la tecla **F8**


## SAP HANA Studio

- Primero que nada, tenemos que tener la conexión previamente lista a nuestro servidor que contiene la app.
- Posteriormente acti vamos la ventana ***SAP HANA Development*** la cual se puede activar desde la opción ***Open Perspective*** 
- Ahora nos posicionamos en la prestaña *Project Explorer* y creamos un nuevo proyecto: ***New -> Other...***
- En el cuadro de busqueda escribimos xs projecto lo buscamos en *SAP HANA -> Application Development -> XS Project***
- Posteriormente elegimos un espacio de trabajo, nombramos a nuestro proyecto  y finalizamos.
- En nuestro nuevo proyecto creamos un nuevo archivo ***New -> File*** y lo nombramos *index.html* y creamos un index sencillo a nuestro gusto.
- Por último activamos el archivo *index.html* ***Team -> Activate***

Ahora sí, tenemos todo listo, sólo queda hacer clic sobre nuestro inde.html y ejecutarlo con el boton verde en la parte superior o Run AS -> 1 HTML.



