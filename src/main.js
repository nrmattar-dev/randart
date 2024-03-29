/*
const templates = {
    home: `
    <section id="presentacion">

    <div class="image-container">
        <a href="templates/galeria.html">
            <div class="gallery">
            </div>
        </a>
        <div class="gallery-indicators">
        </div>
    </div>
    <p>Bienvenidos a Randart! Somos una plataforma en línea que ofrece arte y coleccionismo al azar, dando a
        todos los usuarios la igual oportunidad de exhibir y vender sus obras. En Randart, creemos que el arte
        es para todos y queremos fomentar la creatividad y la cultura artística en línea. Nuestro objetivo es
        proporcionar una plataforma en línea en la que los artistas y coleccionistas puedan exhibir sus obras y
        los usuarios puedan comprarlas o intercambiarlas de manera aleatoria. En nuestra página web encontrarás
        una amplia variedad de obras de arte, desde pinturas hasta esculturas, fotografías y mucho más. ¡Explora
        nuestra plataforma y descubre tu próxima pieza de arte favorita!</p>
</section>


        `,
    obras: `
    
        <section v-if="error">Lo sentimos se produjo un error</section>
        <section v-else>
            <section v-if="cargando">
                <div class="spinner-border"></div>
                <p>Cargando .....</p>

            </section>
            <section v-else>

                <section class="tiles">

                    <article v-for="articulo in articulos">

                        <span class="image">
                            <img :src="articulo.imagen" alt="" class="flexible-image" />
                        </span>
                        
                        <a @click="obra_detalle_fn('obra_detalle',articulo.id)">
                            <h2>{{articulo.titulo}}</h2>
                            <div class="content">
                                <p>{{articulo.descripcion}}</p>
                            </div>
                        </a>

                    </article>

                </section>
            </section>
        </section>
        `,
    obra_detalle: `
    <section v-if="error">
  Lo sentimos se produjo un error
</section>
<section v-else>
  <section class="directorio" v-if="cargando">
    <div class="spinner-border"></div>
    <p>Cargando .....</p>
  </section>
  <section v-else>
    <article class="articulo" v-for="articulo in articulos" :key="articulo.id">
      <img :src="articulo.imagen" alt="" />
      <div class="informacion">
        <h2>{{articulo.titulo}}</h2>
        <div><p><b>Autor:</b></p><p>{{articulo.autor}}</p></div>
        <div><p><b>Descripción:</b></p><p class="descripcion">{{articulo.descripcion}}</p></div>
        <div><p><b>Precio:</b></p><p class="precio"><b>U$S {{articulo.precio}}.- (ARS $ {{convertirUSDaARS(articulo.precio)}}.-)</b></p></div>
        <button class="boton-comprar">Comprar</button>
        <div><p><a href="galeria.html">Volver</a></p></div>
      </div>
    </article>
  </section>
</section>
    `,
    galerias: `
    <section v-if="error">Lo sentimos se produjo un error</section>
			<section v-else>
				<section v-if="cargando">
					<div class="spinner-border"></div>
					<p>Cargando .....</p>

				</section>
				<section v-else>

					<section class="directorio">

						<div v-for="galeria in galerias">
							
							<span>
								<iframe :src="galeria.mapa_url" width="400" height="300" style="border:0;"
									allowfullscreen="" loading="lazy"
									referrerpolicy="no-referrer-when-downgrade"></iframe>
							</span>
							
							<h2>{{galeria.razon_social}}</h2>
							<div>
								<p>{{galeria.observaciones}}</p>
							</div>

						</div>

					</section>
				</section>
			</section>
        `,
    subituobra: `
    <section class="contenedor">
    <section class="seccion">
        <h3>Artículos</h3>

        <div class="container-form">

            <form>
                <div class="entrada">
                    <label for="articulo_id">ID</label>
                    <input type="number" name="articulo_id" id="articulo_id" disabled>
                    <label for="titulo">Título:</label>
                    <input type="text" name="titulo" id="titulo">
                    <label for="autor">Autor:</label>
                    <input type="text" name="autor" id="autor">
                    <label for="fecha">Fecha:</label>
                    <input type="text" name="fecha" id="fecha">
                    <label for="descripcion">Descripción:</label>
                    <input type="text" name="descripcion" id="descripcion">
                    <label for="precio">Precio:</label>
                    <input type="text" name="precio" id="precio">
                    <label for="imagen">Imagen:</label>
                    <input type="file" ref="fileInput" @change="handleFileUpload" id="imagen">
                    <img :src="imagenUrl" alt="Imagen previa" v-if="imagenUrl"><!--v-if="imagenUrl" si "imagenUrl" existe, la muestra -->
                </div>
            </form>

        </div>

        <div class="botones">
            <button class="guardar" @click="articulo_save">Guardar</button>
            <button class="limpiar" @click="articulo_clear">Limpiar</button>
        </div>

    </section>

</section>    
    `,
    registro: `
    <section v-if="error">Lo sentimos se produjo un error</section>
    <section v-else>
        <section v-if="cargando">
            <div class="spinner-border"></div>
            <p>Cargando .....</p>

        </section>
        <section v-else>
            <section v-if="Modo==='Registro'">
                <div id="Registro" class="Registro">
                    <div class="Registro-Contenedor">
                        <div class="Campo">
                            <div class="Clase-Input" :class="{ 'input-error': !datos.valida.mail }">
                                <input id="mail" v-model="datos.mail" ref="mail" @blur="ValidarCampo('mail')"
                                    maxlength="50" name="mail" type="text" value="">
                                <label for="mail" :class="{ 'focus': datos.label.mail }">Mail *</label>
                            </div>
                        </div>

                        <div class="Campo">
                            <div class="Clase-Input" :class="{ 'input-error': !datos.valida.nombre }">
                                <input id="nombre" v-model="datos.nombre" ref="nombre"
                                    @blur="ValidarCampo('nombre')" maxlength="50" name="nombre" type="text"
                                    value="">
                                <label for="nombre" :class="{ 'focus': datos.label.nombre }">Nombre (s)
                                    *</label>
                            </div>
                        </div>

                        <div class="Campo">
                            <div class="Clase-Input" :class="{ 'input-error': !datos.valida.apellido }">
                                <input id="apellido" v-model="datos.apellido" ref="apellido"
                                    @blur="ValidarCampo('apellido')" maxlength="50" name="apellido" type="text"
                                    value="">
                                <label for="apellido" :class="{ 'focus': datos.label.apellido }">Apellido (s)
                                    *</label>
                            </div>
                        </div>

                        <div class="Campo">
                            <div class="Clase-Combo" role="button" tabindex="-1"
                                :class="{ 'input-error': !datos.valida.pais }">
                                <input id="pais" @blur="ValidarCampo('pais')" v-model="datos.pais"
                                    class="Clase-Combo-input" @input="filtrarPaises" @click="atenderclick"
                                    ref="pais" @keydown.escape="ocultarLista" @keydown.tab="ocultarLista"
                                    placeholder="" src="false" type="text" autocomplete="off" value="">
                                <label for="pais" :class="{ 'focus': datos.label.pais }">País</label>
                            </div>

                            <div class="lista-ctn" v-show="mostrarLista" ref="pais_lista">
                                <ul class="lista">

                                    <li class="item" v-for="(pais, index) in paisesFiltrados">
                                        <button class="opcion" :name="index === 0 ? 'hovered' : ' '"
                                            :key="pais.id" @click="seleccionarPais(pais.id,pais.descripcion)"
                                            value="false">{{pais.descripcion }}</button>
                                    </li>

                                </ul>
                            </div>

                        </div>
                        <div class="Campo">
                            <div class="Clase-Input" :class="{ 'input-error': !datos.valida.ciudad }">
                                <input id="ciudad" v-model="datos.ciudad" ref="ciudad"
                                    @blur="ValidarCampo('ciudad')" maxlength="50" name="ciudad" type="text"
                                    value="">
                                <label for="ciudad" :class="{ 'focus': datos.label.ciudad }">Ciudad</label>
                            </div>
                        </div>
                        <div class="Campo">
                            <div class="Clase-Input" :class="{ 'input-error': !datos.valida.calle }">
                                <input id="calle" v-model="datos.calle" ref="calle"
                                    @blur="ValidarCampo('calle')" maxlength="50" name="calle" type="text"
                                    value="">
                                <label for="calle" :class="{ 'focus': datos.label.calle }">Calle</label>
                            </div>
                        </div>
                        <div class="Campo">
                            <div class="Clase-Input" :class="{ 'input-error': !datos.valida.numero }">
                                <input id="numero" v-model="datos.numero" ref="numero"
                                    @blur="ValidarCampo('numero')" maxlength="50" name="numero" type="text"
                                    value="">
                                <label for="numero" :class="{ 'focus': datos.label.numero }">Número</label>
                            </div>
                        </div>
                        <div class="Campo">
                            <div class="Clase-Input" :class="{ 'input-error': !datos.valida.password }">
                                <input id="password" maxlength="30" name="password" ref="password"
                                    v-model="datos.password" @blur="ValidarCampo('password')" type="password"
                                    value="">
                                <label for="password" :class="{ 'focus': datos.label.password }">Contraseña
                                    *</label>
                            </div>
                        </div>
                        <div class="Campo">
                            <div class="Clase-Input"
                                :class="{ 'input-error': !datos.valida.confirmacionpassword }">
                                <input id="confirmPassword" v-model="datos.confirmacionpassword"
                                    ref="confirmPassword" @blur="ValidarCampo('confirmacionpassword')"
                                    maxlength="30" name="confirmPassword" type="password" value="">
                                <label for="confirmPassword"
                                    :class="{ 'focus': datos.label.confirmacionpassword }">Confirmar contraseña
                                    *</label>
                            </div>
                        </div>
                    </div>
                    <div class="terminosycondiciones"><label class="terminosycondiciones-check-main">
                            <input aria-label="acept-terms" id="agreeTerms" v-model="datos.agreeTerms"
                                type="checkbox" @change="ValidarCampo()">
                            <span class="terminosycondiciones-geekmark"></span></label><label
                            for="agreeTerms">Acepto los
                            <a aria-label="Términos y condiciones" href="" rel="noreferer noreferrer"
                                target="_blank">términos y condiciones</a> y las <a
                                aria-label="Políticas de privacidad" href="" rel="noreferer noreferrer"
                                target="_blank">políticas de privacidad</a> de
                            randart.com</label><span class="error"></span></div>


                    <div class="Registro-Botones">
                        <button id="Registro-Normal" aria-label="Continuar registro"
                            :class="{'Habilitado': datos.valida.general}" :disabled="!datos.valida.general"
                            @click="Registro_Normal">Continuar</button>
                        <div class="Div-Separador">
                            <div class="Separador"></div>
                            <p> O </p>
                            <div class="Separador"></div>
                        </div>
                        <button id="Boton-Google" class="Habilitado">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                xmlns="http://www.w3.org/2000/svg" class="login-form-icon-google">
                                <g clip-path="url(#clip0_2360_13870)">
                                    <path
                                        d="M3.765 8.99999C3.765 8.40865 3.87 7.86057 4.05 7.32692L0.945 5.01923C0.33 6.24519 0 7.60096 0 8.99999C0 10.4279 0.345 11.7836 0.945 12.9808L4.035 10.6586C3.855 10.1394 3.765 9.57692 3.765 8.99999Z"
                                        fill="#f1bc42"></path>
                                    <path
                                        d="M9.20982 3.67781C10.4398 3.67781 11.6398 4.09608 12.5998 4.8605L15.2848 2.2355C11.4748 -1.03854 5.66982 -0.67796 2.29482 3.04319C1.75482 3.64896 1.30482 4.31243 0.944824 5.01916L4.03482 7.32685C4.75482 5.20666 6.79482 3.67781 9.19482 3.67781H9.20982Z"
                                        fill="#d85040"></path>
                                    <path
                                        d="M4.04996 10.6731L0.959961 12.9808C2.45996 15.9375 5.56496 17.9856 9.16496 18H9.22496C11.475 18 13.62 17.2212 15.225 15.75L12.285 13.5144C11.46 14.0192 10.41 14.3077 9.23996 14.3077C6.82496 14.3077 4.78496 12.7789 4.07996 10.6587L4.04996 10.6731Z"
                                        fill="#58a45c"></path>
                                    <path
                                        d="M18 9C18 8.45192 17.925 7.90385 17.79 7.37019H9.20996V10.8462H14.145C13.89 12.0288 13.215 12.9375 12.255 13.5288L15.195 15.7644C16.89 14.2356 17.985 11.9423 17.985 9.01442L18 9Z"
                                        fill="#5086eb"></path>
                                </g>
                                <defs>
                                    <clipPath id="clip0_2360_13870">
                                        <rect width="18" height="18" fill="white"></rect>
                                    </clipPath>
                                </defs>
                            </svg>
                            <span> Registrarme con Google</span>
                        </button>
                        <button id="Boton-Facebook" class="Habilitado">
                            <svg width="19" height="18" viewBox="0 0 19 18" fill="none"
                                xmlns="http://www.w3.org/2000/svg" class="login-form-icon-facebook">
                                <path
                                    d="M9.50643 0C4.52716 0 0.5 4.02429 0.5 9C0.5 13.9757 4.52716 18 9.50643 18C9.5579 18 9.60936 18 9.66083 18C9.66083 15.8271 9.66083 13.3586 9.66083 11.1986V10.9929H7.73088V8.74286H9.66083C9.66083 8.65286 9.66083 8.58857 9.66083 8.52429C9.66083 7.92 9.6351 7.30286 9.68656 6.69857C9.76376 5.70857 10.1626 4.88571 11.1019 4.43571C11.4107 4.28143 11.7709 4.19143 12.1183 4.15286C12.8259 4.06286 13.5465 4.15286 14.267 4.20429V6.22286C14.267 6.22286 14.1383 6.22286 14.0868 6.22286C13.688 6.22286 13.2763 6.22286 12.8774 6.23571C12.3113 6.26143 12.0154 6.57 12.0025 7.12286C11.9896 7.63714 12.0025 8.13857 12.0025 8.65286C12.0025 8.67857 12.0025 8.70429 12.0025 8.74286H14.2155C14.1126 9.50143 14.0225 10.2471 13.9196 11.0057H11.9896V17.6657C15.7466 16.5857 18.5 13.1271 18.5 9.02571C18.5 4.05 14.4728 0.0257143 9.49357 0.0257143L9.50643 0Z"
                                    fill="#1877f2"></path>
                            </svg>
                            <span> Registrarme con Facebook</span>
                        </button>
                        <p>Ya tengo cuenta</p>
                        <button class="Habilitado" aria-label="Iniciar sesión">Iniciar sesión</button>
                    </div>

                </div>
            </section>
            <section v-if="Modo==='Verificacion'">
                <div class="Verificacion">
                    <h4>ESTÁS A UN PASO DE CREAR TU CUENTA</h4><svg
                        class="svg-icon" width="32" height="32" viewBox="0 0 32 32" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect class="svg-icon-bg" x="0.5" y="0.5" width="31" height="31" rx="15.5" fill="white">
                        </rect>
                        <g clip-path="url(#clip0_2561_16018)">
                            <path
                                d="M22.2557 10.2857C20.1826 10.2857 18.1005 10.2857 16.0274 10.2857C13.9543 10.2857 11.8356 10.2857 9.74429 10.2857C8.63014 10.2857 8 10.9145 8 12.0425C8 14.6778 8 17.313 8 19.9482C8 21.0763 8.63014 21.7143 9.74429 21.7143C13.9178 21.7143 18.0913 21.7143 22.2648 21.7143C23.379 21.7143 24 21.0763 24 19.9482C24 17.313 24 14.6778 24 12.0425C24 10.9145 23.379 10.2857 22.2557 10.2857ZM21.4247 11.6172C20.3379 12.4956 19.2968 13.3278 18.2557 14.16C17.5616 14.724 16.8584 15.2788 16.1644 15.852C16.0365 15.963 15.9543 15.9538 15.8265 15.852C14.1096 14.4651 12.3927 13.0874 10.6758 11.7097C10.6575 11.6912 10.6301 11.6819 10.5571 11.6172H21.4338H21.4247ZM22.2466 20.4198C18.0822 20.4198 13.9178 20.4198 9.75342 20.4198C9.3516 20.4198 9.27854 20.3551 9.27854 19.9852C9.27854 17.4979 9.27854 15.0014 9.27854 12.5141C9.27854 12.4494 9.27854 12.3939 9.2968 12.2644C9.76256 12.6435 10.1918 12.9764 10.6119 13.3185C12.2283 14.613 13.8356 15.9075 15.4429 17.2113C15.8813 17.5626 16.1005 17.5626 16.5297 17.2113C18.5023 15.6209 20.484 14.0398 22.4566 12.4494C22.5205 12.4031 22.5845 12.3569 22.6849 12.2737C22.6849 12.3939 22.7032 12.4771 22.7032 12.5603C22.7032 15.0199 22.7032 17.4887 22.7032 19.9482C22.7032 20.3551 22.6393 20.4198 22.2374 20.4198H22.2466Z"
                                fill="#9B9B9B"></path>
                        </g>
                        <rect class="svg-icon-border" x="0.5" y="0.5" width="31" height="31" rx="15.5"
                            stroke="#9B9B9B"></rect>
                        <defs>
                            <clipPath id="clip0_2561_16018">
                                <rect width="16" height="11.4286" fill="white" transform="translate(8 10.2857)">
                                </rect>
                            </clipPath>
                        </defs>
                    </svg>
                    <p class="register-verification-desc">Te enviamos un link para verificar tu cuenta de email:
                    </p>
                    <p class="register-verification-email">{{datos.mail}}</p>
                    <p class="register-verification-inquiry">¿Todavía no lo recibiste?</p><button
                        class="Habilitado">Reenviar email</button>
                </div>
            </section>
        </section>
    </section>  
    `
}

*/

import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

createApp(App).use(router).mount('#app');