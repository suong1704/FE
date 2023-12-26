"use client";
import {
  Alert,
  Box,
  Button,
  Fab,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import {
  IconEdit,
  IconRowRemove,
  IconOctagonOff,
  IconArrowBigDownLine,
  IconBrandStripe,
  IconArrowBigUpLine,
} from "@tabler/icons-react";
import LessonCard from "@/components/LessonCard";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useState } from "react";
import {
  createLessonThunk,
  publishModuleThunk,
  updateModuleThunk,
} from "@/store/module";
import MyDialog from "@/components/MyDialog";
import { Add } from "@mui/icons-material";
import { Lesson } from "@/store/lesson";

const ModuleDetail = ({ params }: { params: { id: number } }) => {
  const searchParams = useSearchParams();
  const isMyModule = parseInt(searchParams.get("isMyModule")!);
  const myModules = useAppSelector((state) => state.module.myModules);
  const allModules = useAppSelector((state) => state.module.allModules);
  let modules = isMyModule
    ? myModules.find((m) => m.moduleId == params.id)
    : allModules.find((m) => m.moduleId == params.id);
  if (!modules && isMyModule) {
    modules = allModules.find((m) => m.moduleId == params.id);
  }

  const [mode, setMode] = useState<"modify" | "preview">("preview");
  const [moduleMod, setModuleMod] = useState({ ...modules! });
  const dispatch = useAppDispatch();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [lsTilte, setLsTitle] = useState("");
  const [addingLesson, setAddingLesson] = useState(false);

  const updateModule = () => {
    console.log("updateModule");
    dispatch(updateModuleThunk(moduleMod, () => {}));
  };

  const publishModule = () => {
    console.log("publishModule");
    dispatch(
      publishModuleThunk(moduleMod, (newModule) => {
        setModuleMod({ ...newModule });
      })
    );
  };

  const unPublishModule = () => {
    console.log("publishModule");
    dispatch(
      updateModuleThunk({ ...modules!, published: false }, () => {
        setModuleMod({ ...modules!, published: false });
      })
    );
  };

  const deleteUnPublishModule = () => {
    console.log("publishModule");
    dispatch(
      updateModuleThunk({ ...modules!, deleted: true }, () => {
        setModuleMod({ ...modules!, deleted: true });
      })
    );
  };

  const addLesson = () => {
    console.log("addLesson");
    dispatch(
      createLessonThunk(modules?.moduleId!, lsTilte, (newModule) => {
        console.log(newModule);
      })
    );
  };

  return (
    modules && (
      <PageContainer title={modules.title} description="this is Sample page">
        {/* <Image
      src={img4}
      alt="img"
      style={{ width: "100%", height: "270px", borderRadius: "10px" }}
    /> */}
        <DashboardCard
          title={modules.title}
          action={
            isMyModule ? (
              mode == "preview" ? (
                <Stack direction={"row"} spacing={1}>
                  {!moduleMod.deleted && !moduleMod.published && (
                    <Fab
                      color="secondary"
                      size="medium"
                      sx={{ color: "#ffffff" }}
                      onClick={() => {
                        setMode((m) => {
                          if (m == "modify") {
                            //saveHandler();
                            return "preview";
                          } else {
                            return "modify";
                          }
                        });
                      }}>
                      <IconEdit width={24} />
                    </Fab>
                  )}
                  {!moduleMod.published && !moduleMod.deleted && (
                    <Fab
                      color="info"
                      size="medium"
                      onClick={() => {
                        publishModule();
                      }}>
                      <IconArrowBigUpLine width={24} />
                    </Fab>
                  )}
                  {moduleMod.published && !moduleMod.deleted && (
                    <Fab
                      color="primary"
                      size="medium"
                      onClick={() => {
                        unPublishModule();
                      }}>
                      <IconArrowBigDownLine width={24} />
                    </Fab>
                  )}
                  {!moduleMod.deleted && !moduleMod.published && (
                    <>
                      <Fab
                        color="error"
                        size="medium"
                        onClick={() => {
                          setOpenDeleteDialog(true);
                        }}>
                        <IconRowRemove width={24} />
                      </Fab>
                      <MyDialog
                        title="DELETE"
                        mes="Do you want delete this module?"
                        open={openDeleteDialog}
                        handleClose={() => {
                          setOpenDeleteDialog(false);
                        }}
                        onAgree={() => {
                          setOpenDeleteDialog(false);
                          deleteUnPublishModule();
                        }}
                      />
                    </>
                  )}
                </Stack>
              ) : (
                <Stack direction={"row"} spacing={1}>
                  <Fab
                    color="warning"
                    size="medium"
                    sx={{ color: "#ffffff" }}
                    onClick={() => {
                      updateModule();
                      setMode("preview");
                    }}>
                    <IconBrandStripe width={24} />
                  </Fab>
                  <Fab
                    color="error"
                    size="medium"
                    sx={{ color: "#ffffff" }}
                    onClick={() => {
                      setModuleMod({ ...modules! });
                      setMode("preview");
                    }}>
                    <IconOctagonOff width={24} />
                  </Fab>
                </Stack>
              )
            ) : (
              <></>
            )
          }>
          <Box>
            {mode == "modify" && (
              <Stack width={"fit-content"} marginBottom={5} marginTop={-4}>
                <TextField
                  variant="standard"
                  size="small"
                  placeholder="New title..."
                  onChange={(e) => {
                    setModuleMod((prev) => {
                      return {
                        ...prev,
                        title: e.target.value,
                      };
                    });
                  }}
                  value={moduleMod.title}
                />
              </Stack>
            )}
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <Typography variant="h6">{modules.description}</Typography>
              {mode == "modify" && (
                <TextField
                  variant="standard"
                  size="small"
                  placeholder="New description..."
                  onChange={(e) => {
                    setModuleMod((prev) => {
                      return {
                        ...prev,
                        description: e.target.value,
                      };
                    });
                  }}
                  value={moduleMod.description}
                />
              )}
            </Stack>

            <Stack>
              <Typography mt={1} fontWeight={300} variant="h6">
                Total lesson: {modules.lessons.length}
              </Typography>
              {moduleMod.published && !moduleMod.deleted && (
                <Alert severity="success">This module is published</Alert>
              )}
              {moduleMod.deleted && (
                <Alert severity="error">This module is deleted</Alert>
              )}
              {!moduleMod.published && !moduleMod.deleted && (
                <Alert severity="warning">
                  This module hasnt published yet
                </Alert>
              )}
            </Stack>
            <Box m={1}>
              <Grid container spacing={3} mt={2}>
                {modules.lessons.map((l) => {
                  return (
                    <LessonCard
                      key={l.lessonId}
                      lesson={l}
                      isMyModule={isMyModule}
                      moudule={modules!}
                    />
                  );
                })}
              </Grid>
              {mode == "modify" && (
                <Stack
                  direction={"row"}
                  justifyContent={"flex-end"}
                  marginTop={2}
                  marginRight={1}
                  spacing={1}>
                  {addingLesson && (
                    <TextField
                      placeholder="New lesson..."
                      value={lsTilte}
                      onChange={(e) => {
                        setLsTitle(e.target.value);
                      }}
                    />
                  )}
                  {!addingLesson ? (
                    <Button
                      startIcon={<Add />}
                      variant="outlined"
                      onClick={() => {
                        setAddingLesson(true);
                      }}>
                      Add Lesson
                    </Button>
                  ) : (
                    <Button
                      startIcon={<Add />}
                      variant="outlined"
                      onClick={() => {
                        addLesson();
                        setAddingLesson(false);
                        setLsTitle("");
                      }}>
                      Add
                    </Button>
                  )}
                  {addingLesson && (
                    <Button
                      startIcon={<Add />}
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        setAddingLesson(false);
                      }}>
                      Close
                    </Button>
                  )}
                </Stack>
              )}
            </Box>
          </Box>
        </DashboardCard>
      </PageContainer>
    )
  );
};

export default ModuleDetail;
