#include <stdio.h> 
#include <stdlib.h> 
#include <ctype.h> 
#include <string.h> 
#include <iostream>
#define principal 199 
#define total 240 

const char fich[12] = "fichash.dat"; 
FILE *fh = NULL; 
typedef struct { 
	char codigo[7]; 
	char autor[41]; 
	char titulo[41]; 
} Libro; 
#define desplazamiento(n) ((n) * sizeof(Libro)) 
/* prototipo de las funciones */ 
void creacion(void); 
void compra(void); /* operación Alta */ 
void venta(void); /* operación Baja */ 
void consulta(void); 
void colisiones(Libro lib); 
int indexSinonimo(const char c[]); int hash(char c[]); 
long transformaClave(const char c[]); 
void escribir(Libro lib); 

void main() 
{ 
	char opcion; 
		/* comprueba si el archivo ya ha sido creado */ 
	fh = fopen(fich, "rb"); 
	if (fh == NULL) 
	{ 
		puts("EL ARCHIVO VA A SER CREADO");
		creacion();
	}
	else 
		fh = NULL; 
	do 
	{ 
		puts("1. Compra "); 
		puts("2. Venta "); 
		puts("3. Consulta "); 
		puts("5. Salir ");

		do { 
			printf("Elige una opción "); 
			scanf("%c%*c", &opcion); 
		} while (opcion < '1' || opcion > '5' || opcion == '4'); 
		switch (opcion) 
		{ 
			case '1': 
			compra(); break; 
			case '2': 
			venta(); break; 
			case '3': 
			consulta(); break; 
		} 
	} while (opcion != '5'); 
	if (fh != NULL) fclose(fh);
} 
/* Creación: escribe consecutivamente total registros, todos con el campo código igual a '*' para indicar que están libres. */ 

void creacion(void) 
{ 
	Libro lib; 
	int i; 

	fh = fopen(fich, "wb+"); 
	strcpy(lib.codigo, "*"); 
	for (i = 1; i <= total; i++) 
		fwrite(&lib, sizeof(lib), 1, fh); 
	fclose(fh);	 
	fh = NULL; 
} 
/* Alta de un registro: pide al usuario los campos código, título y autor. Llama a la función hash() 
para obtener la posición en la que leer el registro, si está libre graba el nuevo registro. 
Si está ocupado busca en el área de colisiones la primera posición libre que será donde escribe el registro. */ 

void compra(void)
{
    Libro lib, libar;
    long posicion;

    if (fh == NULL) fh = fopen(fich, "rb+");

    printf("Código: "); std::cin>>lib.codigo;
    printf("Autor: "); std::cin >> lib.autor;
    printf("Título: "); std::cin >> lib.codigo;
    posicion = hash(lib.codigo);
    posicion = desplazamiento(posicion);

    fseek(fh, posicion, SEEK_SET);
    fread(&libar, sizeof(Libro), 1, fh);
    if (strcmp(libar.codigo, "*") == 0) /* registro libre */
    {
        fseek(fh, -sizeof(Libro), SEEK_CUR);
        fwrite(&lib, sizeof(Libro), 1, fh);
        printf("Registro grabado en la dirección: %ld\n", posicion);
    }
    else if (strcmp(lib.codigo, libar.codigo) == 0) /* duplicado */
    {
        puts("Código repetido, revisar los datos.");
        return;
    }
    else
        colisiones(lib);
    fflush(fh);
} 
/* Baja de un registro: pide el código del registro. Se lee el registro cuya posición está determinada por 
la función hash(). Si los códigos son iguales, se da de baja escribiendo '*' en el campo codigo. En caso 
contrario se busca en el área de colisiones y se procede igual. */

void venta()
{
    Libro libar;
    char codigo[7], r;
    long posicion;

    if (fh == NULL)fh = fopen(fich, "rb+");
    printf("Código: "); std::cin >> codigo;
    posicion = hash(codigo);
    posicion = desplazamiento(posicion);

    fseek(fh, posicion, SEEK_SET);
    fread(&libar, sizeof(Libro), 1, fh);
    if (strcmp(libar.codigo, codigo) != 0)
        posicion = indexSinonimo(codigo);
    if (posicion != -1)
    {
        escribir(libar);
        printf("¿Son correctos los datos? (S/N): ");
        scanf("%c%*c", &r);
        if (toupper(r) == 'S')
        {
            strcpy(libar.codigo, "*");
            fseek(fh, -sizeof(Libro), SEEK_CUR);
            fwrite(&libar, sizeof(Libro), 1, fh);
        }
    }
    else
        puts("No se encuentra un registro con ese código.");
    fflush(fh);
} 
/* Consulta de un registro: pide el código del registro. Se lee el registro cuya posición está 
determinada por la función hash(). Si los códigos son iguales se muestra por pantalla. En caso 
contrario se busca en el área de colisiones. */

void consulta()
{
    Libro lib;
    char codigo[7];
    long posicion;

    if (fh == NULL) fh = fopen(fich, "rb+");

    printf("Código: "); std::cin >> codigo;
    posicion = hash(codigo);
    posicion = desplazamiento(posicion);

    fseek(fh, posicion, SEEK_SET);
    fread(&lib, sizeof(Libro), 1, fh);

    if (strcmp(lib.codigo, codigo) == 0)
        escribir(lib);
    else
    {
        int posicion;
        posicion = indexSinonimo(codigo);
        if (posicion != -1)
        {
            fseek(fh, -sizeof(Libro), SEEK_CUR);
            fread(&lib, sizeof(Libro), 1, fh);
            escribir(lib);
        }
        else
            puts("No se encuentra un ejemplar con ese código.");
    }
}

/* Inserta en área de sinónimos: busca secuencialmente el primer registro libre (codigo=='*') 
para grabar el registro lib. */ 

void colisiones(Libro lib)
{
    Libro libar;
    int pos = desplazamiento(principal);
    int j = principal;
    int encontrado;

    fseek(fh, pos, SEEK_SET); /* se sitúa en área de sinónimos */
    encontrado = 0;

    while ((j < total) && !encontrado)
    {
        fread(&libar, sizeof(Libro), 1, fh);
        j++;
        if (strcmp(libar.codigo, "*") == 0) /* libre */
        {
            encontrado = 1;
            fseek(fh, -sizeof(Libro), SEEK_CUR);
            fwrite(&lib, sizeof(Libro), 1, fh);
            puts("Datos grabados en el área de sinónimos.");
        }
    }
    if (!encontrado)
        puts("Área de sinónimos completa. ");
    fflush(fh);
} 

/* Búsqueda en área de sinónimos: búsqueda secuencial, por código, de un registro. Devuelve la 
posición que ocupa, o bien -1 si no se encuentra. */

int indexSinonimo(const char c[])
{
    Libro libar;
    int pos = desplazamiento(principal);
    int j = principal;
    int encontrado;

    fseek(fh, pos, SEEK_SET); /* se situa en area de sinónimos */
    encontrado = 0;

    while ((j < total) && !encontrado)
    {
        fread(&libar, sizeof(Libro), 1, fh);
        j++;
        if (strcmp(libar.codigo, c) == 0)
            encontrado = 1;
    }
    if (!encontrado)
        j = -1;
    return j;
} 

/* Aritmética modular: transforma cadena a un entero en el rango [0, principal). 
En primer lugar pasa los caracteres del código a mayúsculas. A continuación, llama 
a la función que convierte la cadena a entero largo. Por último, aplica el módulo 
respecto a principal. El módulo produce un entero de 0 a principal-1. */

int hash(char c[])
{
    int i, suma = 0;
    for (i = 0; i < strlen(c); i++)
        c[i] = toupper(c[i]);
    return transformaClave(c) % principal;
}

long transformaClave(const char* clave)
{
    int j;
    long d;
    d = 0;
    for (j = 0; j < strlen(clave); j++)
    {
        d = d * 27 + clave[j];
    } /* Si d supera el máximo entero largo, genera número negativo */
    if (d < 0)
        d = -d;
    return d;
}

void escribir(Libro lib)
{
    printf("Código: %s\t", lib.codigo);
    printf("Autor: %s\t", lib.autor);
    printf("Título: %s\n", lib.titulo);
}
