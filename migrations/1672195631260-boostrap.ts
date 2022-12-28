import { MigrationInterface, QueryRunner } from 'typeorm';

export class boostrap1672195631260 implements MigrationInterface {
  name = 'boostrap1672195631260';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`movie\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`language\` varchar(30) NULL, \`status\` enum ('started', 'ended', 'ongoing') NULL, \`rating\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`movie_to_cast\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`movieId\` bigint NOT NULL, \`castId\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`cast\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`birthday\` date NULL, \`deathDay\` datetime NULL, \`rating\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`movie_to_cast\` ADD CONSTRAINT \`FK_8efb6173ecc0caf78e7da08bd3e\` FOREIGN KEY (\`movieId\`) REFERENCES \`movie\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`movie_to_cast\` ADD CONSTRAINT \`FK_13d6cb6ef56de02b5ada6afc268\` FOREIGN KEY (\`castId\`) REFERENCES \`cast\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`movie_to_cast\` DROP FOREIGN KEY \`FK_13d6cb6ef56de02b5ada6afc268\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`movie_to_cast\` DROP FOREIGN KEY \`FK_8efb6173ecc0caf78e7da08bd3e\``,
    );
    await queryRunner.query(`DROP TABLE \`cast\``);
    await queryRunner.query(`DROP TABLE \`movie_to_cast\``);
    await queryRunner.query(`DROP TABLE \`movie\``);
  }
}
