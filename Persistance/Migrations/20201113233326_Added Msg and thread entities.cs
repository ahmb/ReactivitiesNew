using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistance.Migrations
{
    public partial class AddedMsgandthreadentities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Threads",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Threads", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Msgs",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    ThreadId = table.Column<Guid>(nullable: false),
                    AppUserId = table.Column<string>(nullable: true),
                    SentDateTime = table.Column<DateTime>(nullable: false),
                    Body = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Msgs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Msgs_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Msgs_Threads_ThreadId",
                        column: x => x.ThreadId,
                        principalTable: "Threads",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ThreadParticipants",
                columns: table => new
                {
                    AppUserId = table.Column<string>(nullable: false),
                    TheadId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ThreadParticipants", x => new { x.AppUserId, x.TheadId });
                    table.ForeignKey(
                        name: "FK_ThreadParticipants_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ThreadParticipants_Threads_TheadId",
                        column: x => x.TheadId,
                        principalTable: "Threads",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MsgReadStates",
                columns: table => new
                {
                    MessageId = table.Column<Guid>(nullable: false),
                    AppUserId = table.Column<string>(nullable: false),
                    ReadDateTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MsgReadStates", x => new { x.MessageId, x.AppUserId });
                    table.ForeignKey(
                        name: "FK_MsgReadStates_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MsgReadStates_Msgs_MessageId",
                        column: x => x.MessageId,
                        principalTable: "Msgs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MsgReadStates_AppUserId",
                table: "MsgReadStates",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Msgs_AppUserId",
                table: "Msgs",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Msgs_ThreadId",
                table: "Msgs",
                column: "ThreadId");

            migrationBuilder.CreateIndex(
                name: "IX_ThreadParticipants_TheadId",
                table: "ThreadParticipants",
                column: "TheadId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MsgReadStates");

            migrationBuilder.DropTable(
                name: "ThreadParticipants");

            migrationBuilder.DropTable(
                name: "Msgs");

            migrationBuilder.DropTable(
                name: "Threads");
        }
    }
}
