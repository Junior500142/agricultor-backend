import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAgricultores1234567890123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'agricultores',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
            isGenerated: false, // UUID será gerado pela aplicação
          },
          {
            name: 'razao_social',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'nome_fantasia',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'cnpj_cpf',
            type: 'varchar',
            length: '18',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'celular',
            type: 'varchar',
            length: '20',
            isNullable: true,
          },
          {
            name: 'cidade',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'estado',
            type: 'varchar',
            length: '2',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.query(
      `CREATE INDEX IDX_CNPJ_CPF ON agricultores(cnpj_cpf)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('agricultores');
  }
}