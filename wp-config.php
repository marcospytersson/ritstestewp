<?php
/**
 * As configurações básicas do WordPress
 *
 * O script de criação wp-config.php usa esse arquivo durante a instalação.
 * Você não precisa usar o site, você pode copiar este arquivo
 * para "wp-config.php" e preencher os valores.
 *
 * Este arquivo contém as seguintes configurações:
 *
 * * Configurações do MySQL
 * * Chaves secretas
 * * Prefixo do banco de dados
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Configurações do MySQL - Você pode pegar estas informações com o serviço de hospedagem ** //
/** O nome do banco de dados do WordPress */
define( 'DB_NAME', 'ritstestewp' );

/** Usuário do banco de dados MySQL */
define( 'DB_USER', 'root' );

/** Senha do banco de dados MySQL */
define( 'DB_PASSWORD', '' );

/** Nome do host do MySQL */
define( 'DB_HOST', 'localhost' );

/** Charset do banco de dados a ser usado na criação das tabelas. */
define( 'DB_CHARSET', 'utf8mb4' );

/** O tipo de Collate do banco de dados. Não altere isso se tiver dúvidas. */
define( 'DB_COLLATE', '' );

/**#@+
 * Chaves únicas de autenticação e salts.
 *
 * Altere cada chave para um frase única!
 * Você pode gerá-las
 * usando o {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org
 * secret-key service}
 * Você pode alterá-las a qualquer momento para invalidar quaisquer
 * cookies existentes. Isto irá forçar todos os
 * usuários a fazerem login novamente.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '.lT@hA97%#h)4^XWmVK<cns6Gzv;p%kSDkmLe8~]C1jVzX#g7=hieoO|R^tHokWb' );
define( 'SECURE_AUTH_KEY',  't^`-K0:tiRzGO]M%%gX7kX0#R.RW53v9e}(*uM ]Q@U8q/t!/S:*+` ~L1}A+ 3R' );
define( 'LOGGED_IN_KEY',    ':<gi_7BvK>F%UK3_X:YEU?k$XeWxo4cZc?S3G3:WT/=GS$pG<78hG(t^!eLPmnC*' );
define( 'NONCE_KEY',        'qy%C[{dbv|mKUmm<M.%IU`6Z~(l4>hu?Td@BJ=ZJ}H|l#|8F;IJ^z4p5Fn]n]4A2' );
define( 'AUTH_SALT',        '$;7{1y3qXY 2] B;`1B.d9``Id<~@o>.s??A&B8Ly#i|s![7x%2mJlwFl5$?E^Wa' );
define( 'SECURE_AUTH_SALT', 'uk5.NJ:C4^r5k8?GI:[wqi>7fx+({wXfoM?~nwMo+kJ_@sWhyd?&q&jpQmhKgStQ' );
define( 'LOGGED_IN_SALT',   '$)0(&4O)_z&2 tfN=[UKW~Y=XLeXMJv0Eay[rdl)H(J 1hfLy5.yi+V0bTdf@i&`' );
define( 'NONCE_SALT',       '{x<_U%]l}8M~8H=M^YO>?2n|(VC]/3oW3yK1CiPYycAZYe,wK<5@nqVi]c)*3$R^' );

/**#@-*/

/**
 * Prefixo da tabela do banco de dados do WordPress.
 *
 * Você pode ter várias instalações em um único banco de dados se você der
 * um prefixo único para cada um. Somente números, letras e sublinhados!
 */
$table_prefix = 'wp_';

/**
 * Para desenvolvedores: Modo de debug do WordPress.
 *
 * Altere isto para true para ativar a exibição de avisos
 * durante o desenvolvimento. É altamente recomendável que os
 * desenvolvedores de plugins e temas usem o WP_DEBUG
 * em seus ambientes de desenvolvimento.
 *
 * Para informações sobre outras constantes que podem ser utilizadas
 * para depuração, visite o Codex.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Isto é tudo, pode parar de editar! :) */

/** Caminho absoluto para o diretório WordPress. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Configura as variáveis e arquivos do WordPress. */
require_once ABSPATH . 'wp-settings.php';
