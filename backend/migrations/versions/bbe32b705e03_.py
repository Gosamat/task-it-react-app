"""empty message

Revision ID: bbe32b705e03
Revises: 1900a184cfe4
Create Date: 2024-01-10 21:26:38.445821

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bbe32b705e03'
down_revision = '1900a184cfe4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tasks', schema=None) as batch_op:
        batch_op.add_column(sa.Column('description_encrypted', sa.LargeBinary(), nullable=False))
        batch_op.drop_constraint('tasks_description_key', type_='unique')
        batch_op.drop_column('description')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tasks', schema=None) as batch_op:
        batch_op.add_column(sa.Column('description', sa.VARCHAR(), autoincrement=False, nullable=False))
        batch_op.create_unique_constraint('tasks_description_key', ['description'])
        batch_op.drop_column('description_encrypted')

    # ### end Alembic commands ###
